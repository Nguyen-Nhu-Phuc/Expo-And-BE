const express = require('express')
const router = express.Router()
const placeController = require('../app/controllers/Place.controller')
const multer = require('multer')

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.post('/create', upload.array('image', 10), placeController.create)
router.get('/getAll', placeController.getAll)
router.get('/getById/:id', placeController.getById)
router.patch('/update/:id', placeController.update)
router.delete('/delete/:id', placeController.deletePlace)
router.delete('/deleteImage/:id/:imageId', placeController.deleteImagePlace)
router.patch('/updateImage/:id', upload.array('image', 10), placeController.updateImagePlace)
// router.delete('/deleteImage/:id/:imageId', hotelController.deleteImageHotel)
// router.patch('/updateImage/:id', upload.array('image', 10), hotelController.updateImageHotel)

module.exports = router
