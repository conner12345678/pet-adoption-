const express = require('express');
const router = express.Router();

const {
    newUser,
    users,
    findUser,
} = require('../controllers/adopt')

router.route('/sign/in').post(findUser)
router.route('/sign/up/add').post(newUser)

module.exports = router