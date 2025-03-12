const Destination = require('../models/Destination.model')
const Place = require('../models/Place.model')

const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const create = async (req, res) => {
  try {
    let data

    if (req.body.data) {
      data = JSON.parse(req.body.data)
    } else {
      data = req.body
    }
    const destination = await Destination.findById(data.destination_id)
    if (!destination) {
      return res.status(404).json({
        status: 1,
        message: 'Không tìm thấy địa điểm'
      })
    }

    if (req.files && req.files.length > 0) {
      const imageArray = []
      for (const file of req.files) {
        const base64String = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`
        const uploadedImage = await cloudinary.uploader.upload(base64String, {
          folder: 'places'
        })
        imageArray.push({ url: uploadedImage.secure_url })
      }
      data.image = imageArray
    }

    const place = new Place(data)

    destination.place_id.push(place._id)
    await destination.save()
    await place.save()

    res.status(201).json(place)
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tạo địa điểm', error })
  }
}

const getAll = async (req, res) => {
  try {
    const places = await Place.find({}).populate('destination_id')

    res.status(200).json(places)
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách', error })
  }
}

const getById = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id).populate('destination_id')
    if (!place)
      return res.status(404).json({
        status: 1,
        message: 'Không tìm thấy địa điểm'
      })

    res.status(200).json(place)
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy địa điểm', error })
  }
}

const update = async (req, res) => {
  try {
    const place = await Place.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!place) {
      return res.status(404).json({ status: 1, message: 'Không tìm thấy địa điểm' })
    }

    await Destination.updateOne({ place_id: place._id }, { $pull: { place_id: place._id } })

    if (req.body.destination_id) {
      const destination = await Destination.findById(req.body.destination_id)
      if (!destination) {
        return res.status(404).json({ status: 1, message: 'Không tìm thấy địa điểm' })
      }

      await Destination.updateOne({ _id: req.body.destination_id }, { $addToSet: { place_id: place._id } })
    }

    res.status(200).json({ status: 0, message: 'Cập nhật thành công', place })
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật', error })
  }
}

const deletePlace = async (req, res) => {
  try {
    const place = await Place.findByIdAndDelete(req.params.id)
    if (!place)
      return res.status(404).json({
        status: 1,
        message: 'Không tìm thấy địa điểm'
      })
    const destination = await Destination.findOne({ place_id: place._id })
    if (destination) {
      destination.place_id = []
      await destination.save()
    }
    res.status(200).json({
      status: 0,
      message: 'Xóa thành công'
    })
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa', error })
  }
}

const deleteImagePlace = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id)
    if (!place) {
      return res.status(404).json({
        status: 1,
        message: 'Không tìm thấy điểm tham quan'
      })
    }

    const imageIndex = place.image.findIndex((img) => img._id.toString() === req.params.imageId)
    if (imageIndex === -1) {
      return res.status(404).json({
        status: 1,
        message: 'Không tìm thấy ảnh'
      })
    }

    const imageUrl = place.image[imageIndex].url

    const publicId = imageUrl.split('/').slice(-1)[0].split('.')[0]

    await cloudinary.uploader.destroy(`places/${publicId}`)

    place.image.splice(imageIndex, 1)
    await place.save()

    res.status(200).json({
      status: 0,
      message: 'Xóa ảnh thành công'
    })
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa ảnh', error })
  }
}

const updateImagePlace = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id)
    if (!place) {
      return res.status(404).json({
        status: 1,
        message: 'Không tìm thấy địa điểm'
      })
    }

    if (req.files && req.files.length > 0) {
      const imageArray = []
      for (const file of req.files) {
        const base64String = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`
        const uploadedImage = await cloudinary.uploader.upload(base64String, {
          folder: 'places'
        })
        imageArray.push({ url: uploadedImage.secure_url })
      }
      place.image.push(...imageArray)
    }

    await place.save()

    res.status(200).json({
      status: 0,
      message: 'Thêm ảnh thành công',
      images: place.image
    })
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật ảnh', error })
  }
}

module.exports = { create, getAll, getById, update, deletePlace, deleteImagePlace, updateImagePlace }
