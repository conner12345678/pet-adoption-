const express = require('express');
const router = express.Router();

const {
    newUser,
    user,
} = require('../controllers/adopt')

router.route('/').get(user).post(newUser)

module.exports = router