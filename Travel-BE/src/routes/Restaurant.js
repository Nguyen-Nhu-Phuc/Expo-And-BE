const express = require('express')
const router = express.Router()
const restaurantController = require('../app/controllers/Restaurant.controller')
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/create', upload.array('image', 10), restaurantController.create)
router.get('/getAll', restaurantController.getAll)
router.get('/getById/:id', restaurantController.getById)
router.patch('/update/:id', restaurantController.update)
router.delete('/delete/:id', restaurantController.deleteRestaurant)
router.delete('/deleteImage/:id/:imageId', restaurantController.deleteImageRestaurant)
router.patch('/updateImage/:id', upload.array('image', 10), restaurantController.updateImageRestaurant)


module.exports = router