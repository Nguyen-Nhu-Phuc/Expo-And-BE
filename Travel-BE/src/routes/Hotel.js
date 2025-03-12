const express = require('express')
const router = express.Router()
const hotelController = require('../app/controllers/Hotel.controller')

const multer = require('multer')

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.post('/create', upload.array('image', 10), hotelController.create)
router.get('/getAll', hotelController.getAll)
router.get('/getById/:id', hotelController.getById)
router.patch('/update/:id', hotelController.update)
router.delete('/delete/:id', hotelController.deleteHotel)
router.delete('/deleteImage/:id/:imageId', hotelController.deleteImageHotel)
router.patch('/updateImage/:id', upload.array('image', 10), hotelController.updateImageHotel)

module.exports = router
