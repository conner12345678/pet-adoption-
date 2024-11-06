const User = require('../models/User');
const Pet = require('../models/Pet')
const asyncWrapper = require('../middleware/async');
const {createCustomError} = require('../errors/custom-error');

const newUser = asyncWrapper(async (req, res) => {
    const user = User.create(req.body);
    console.log(req.body);
    res.redirect('/')
})
const users = asyncWrapper(async (req, res) => {
    const users = await User.findOne({})
    res.status(200).json({users})
})
const findUser = asyncWrapper(async (req,res) => {
    const username = req.body.username
    const password = req.body.password
    try{
        const user = await User.findOne({ username, password })
        console.log(user)
        if(user){
            res.redirect('/sign/up')
        } else if(!user) {
            res.status(401).send("Invalid credentials")
        }
    } catch (error){
        console.error('Error finding user:', error)
        res.status(500).send("Server error")
    }
})

const newPet = asyncWrapper(async (req, res) => {
    const pet = Pet.create(req.body);
    res.redirect('/pets')
})

module.exports = {newUser, users, findUser, newPet}