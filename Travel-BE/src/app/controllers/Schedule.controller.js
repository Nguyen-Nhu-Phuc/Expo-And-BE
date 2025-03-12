const Schedule = require('../models/Schedule.model')

// Tạo lịch trình mới
const createSchedule = async (req, res) => {
  try {
    let data

    if (req.body.data) {
      data = JSON.parse(req.body.data)
    } else {
      data = req.body
    }
    const schedule = new Schedule(req.body)
    await schedule.save()
    res.status(201).json({ message: 'Lịch trình đã được tạo thành công', schedule })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Lấy danh sách lịch trình của một user
const getSchedulesByUser = async (req, res) => {
  try {
    const { userId } = req.params
    const schedules = await Schedule.find({ user_id: userId }).populate('user_id')
    res.status(200).json(schedules)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Lấy chi tiết một lịch trình
const getScheduleById = async (req, res) => {
  try {
    const { id } = req.params
    const schedule = await Schedule.findById(id)
      .populate('user_id')
      .populate('schedule.place.place_id')
      .populate('schedule.hotel.hotel_id')
      .populate('schedule.restaurant.restaurant_id')

    if (!schedule) {
      return res.status(404).json({ message: 'Không tìm thấy lịch trình' })
    }
    res.status(200).json(schedule)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Lấy tất cả lịch trình
const getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find()
      .populate('user_id', 'name email') // Lấy thông tin user
      .populate('schedule.place.place_id', 'name address') // Lấy thông tin địa điểm
      .populate('schedule.hotel.hotel_id', 'name address') // Lấy thông tin khách sạn
      .populate('schedule.restaurant.restaurant_id', 'name address') // Lấy thông tin nhà hàng

    res.status(200).json(schedules)
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message })
  }
}

// Cập nhật lịch trình
const updateSchedule = async (req, res) => {
  try {
    const { id } = req.params
    const updatedSchedule = await Schedule.findByIdAndUpdate(id, req.body, { new: true })

    if (!updatedSchedule) {
      return res.status(404).json({ message: 'Không tìm thấy lịch trình để cập nhật' })
    }
    res.status(200).json({ message: 'Lịch trình đã được cập nhật', updatedSchedule })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Xóa lịch trình (Xóa vĩnh viễn)
const deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params

    // Tìm và xóa vĩnh viễn lịch trình
    const schedule = await Schedule.findByIdAndDelete(id)

    if (!schedule) {
      return res.status(404).json({ message: 'Không tìm thấy lịch trình' })
    }

    res.status(200).json({ message: 'Lịch trình đã được xóa vĩnh viễn' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  createSchedule,
  getSchedulesByUser,
  getAllSchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule
}
