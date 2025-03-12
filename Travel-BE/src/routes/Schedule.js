const express = require('express')
const router = express.Router()
const Schedule = require('../app/controllers/Schedule.controller')

// Tạo lịch trình mới
router.post('/create', Schedule.createSchedule)

// Lấy danh sách lịch trình của user
router.get('/user/:userId', Schedule.getSchedulesByUser)
// Lấy danh sách tất cả lịch trình
router.get('/getAll', Schedule.getAllSchedules)

// Lấy chi tiết lịch trình
router.get('/:id', Schedule.getScheduleById)

// Cập nhật lịch trình
router.put('/update/:id', Schedule.updateSchedule)

// Xóa lịch trình
router.delete('/delete/:id', Schedule.deleteSchedule)

module.exports = router
