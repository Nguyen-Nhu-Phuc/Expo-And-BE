const Destination = require('../models/Destination.model')
const Restaurant = require('../models/Restaurant.model')

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
          folder: 'restaurants'
        })
        imageArray.push({ url: uploadedImage.secure_url })
      }
      data.image = imageArray
    }

    const restaurant = new Restaurant(data)

    destination.restaurant_id.push(restaurant._id)
    await destination.save()
    await restaurant.save()

    res.status(201).json(restaurant)
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tạo nhà hàng', error })
  }
}

const getAll = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({}).populate('destination_id')

    res.status(200).json(restaurants)
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách', error })
  }
}

const getById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id).populate('destination_id')
    if (!restaurant)
      return res.status(404).json({
        status: 1,
        message: 'Không tìm thấy nhà hàng'
      })

    res.status(200).json(restaurant)
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy nhà hàng', error })
  }
}

const update = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!restaurant) {
      return res.status(404).json({ status: 1, message: 'Không tìm thấy nhà hàng' })
    }

    await Destination.updateOne({ restaurant_id: restaurant._id }, { $pull: { restaurant_id: restaurant._id } })

    if (req.body.destination_id) {
      const destination = await Destination.findById(req.body.destination_id)
      if (!destination) {
        return res.status(404).json({ status: 1, message: 'Không tìm thấy địa điểm' })
      }

      await Destination.updateOne({ _id: req.body.destination_id }, { $addToSet: { restaurant_id: restaurant._id } })
    }

    res.status(200).json({ status: 0, message: 'Cập nhật thành công', restaurant })
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật', error })
  }
}

const deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id)
    if (!restaurant) return res.status(404).json({ message: 'Không tìm thấy nhà hàng' })

    const destination = await Destination.findOne({ restaurant_id: restaurant._id })
    if (destination) {
      destination.restaurant_id = []
      await destination.save()
    }

    res.status(200).json({ message: 'Xóa thành công' })
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa', error })
  }
}

const deleteImageRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id)
    if (!restaurant) {
      return res.status(404).json({
        status: 1,
        message: 'Không tìm thấy điểm tham quan'
      })
    }

    const imageIndex = restaurant.image.findIndex((img) => img._id.toString() === req.params.imageId)
    if (imageIndex === -1) {
      return res.status(404).json({
        status: 1,
        message: 'Không tìm thấy ảnh'
      })
    }

    const imageUrl = restaurant.image[imageIndex].url

    const publicId = imageUrl.split('/').slice(-1)[0].split('.')[0]

    await cloudinary.uploader.destroy(`restaurants/${publicId}`)

    restaurant.image.splice(imageIndex, 1)
    await restaurant.save()

    res.status(200).json({
      status: 0,
      message: 'Xóa ảnh thành công'
    })
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa ảnh', error })
  }
}

const updateImageRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id)
    if (!restaurant) {
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
          folder: 'restaurants'
        })
        imageArray.push({ url: uploadedImage.secure_url })
      }
      restaurant.image.push(...imageArray)
    }

    await restaurant.save()

    res.status(200).json({
      status: 0,
      message: 'Thêm ảnh thành công',
      images: restaurant.image
    })
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật ảnh', error })
  }
}

module.exports = { create, getAll, getById, update, deleteImageRestaurant, deleteRestaurant, updateImageRestaurant }
