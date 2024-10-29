const User = require('../models/User');
const asyncWrapper = require('../middleware/async');
const {createCustomError} = require('../errors/custom-error');

const newUser = asyncWrapper(async (req, res) => {
    const user = User.create(req.body);
    console.log(req.body);
    res.status(201).json({user});
})
const user = asyncWrapper(async (req, res) => {
    const {id:userID} = req.params
    const user = await User.findOne({ _id:userID})
    if(!user){
        throw new createCustomError("User not found", 404)
    }
    res.status(200).json({user: user})
})

module.exports = {newUser, user}