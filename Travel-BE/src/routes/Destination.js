const express = require('express')
const router = express.Router()
const destinationController = require('../app/controllers/Destination.controller')

const multer = require('multer')

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.post('/createdestination', upload.array('image', 10), destinationController.create)
router.get('/getAlldestination', destinationController.getAll)
router.get('/getBy/:id', destinationController.getById)
router.patch('/update/:id', destinationController.updateDestination)
router.patch('/updateImage/:id', upload.array('image', 10), destinationController.updateImageDestination)
router.delete('/delete/:id', destinationController.deleteDestination)
router.delete('/deleteImage/:id/:imageId', destinationController.deleteImageDestination)

module.exports = router
