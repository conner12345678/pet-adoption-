const express = require('express');
const router = express.Router();
const app = express()
const multer = require('multer')
const cloudinary = require('cloudinary').v2
const {CloudinaryStorage} = require('multer-storage-cloudinary')

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "task-manager", // You can change this to any folder you prefer
      allowed_formats: ["jpg", "jpeg", "png"],
    },
});

  const upload = multer({ storage })

const {
    newUser,
    users,
    findUser,
    newPet,
    newComment,
    updatePet
} = require('../controllers/adopt')

router.route('/sign/in').post(findUser)
router.route('/sign/up/add').post(newUser)
router.route('/new/pet').post(upload.single('image'), newPet)
router.route('/newComment/:id').post(newComment)
router.route('/petUpdate/:id').post(updatePet)

module.exports = router