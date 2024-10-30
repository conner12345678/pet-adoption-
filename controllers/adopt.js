const User = require('../models/User');
const asyncWrapper = require('../middleware/async');
const {createCustomError} = require('../errors/custom-error');

const newUser = asyncWrapper(async (req, res) => {
    const user = User.create(req.body);
    console.log(req.body);
    res.status(201).json({user});
})
const user = asyncWrapper(async (req, res) => {
    const users = await User.findOne({})
    res.status(200).json({users})
})

module.exports = {newUser, user}