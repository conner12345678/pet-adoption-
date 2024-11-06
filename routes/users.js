const express = require('express');
const router = express.Router();
const app = express()

const {
    newUser,
    users,
    findUser,
    newPet,
} = require('../controllers/adopt')

router.route('/sign/in').post(findUser)
router.route('/sign/up/add').post(newUser)
router.route('/new/pet').post(newPet)

module.exports = router