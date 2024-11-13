const User = require('../models/User');
const Pet = require('../models/Pet')
const asyncWrapper = require('../middleware/async');
const {createCustomError} = require('../errors/custom-error');
const multer = require('multer')
const cloudinary = require('cloudinary').v2

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
            res.redirect('/signup')
        } else if(!user) {
            res.status(401).send("Invalid credentials")
        }
    } catch (error){
        console.error('Error finding user:', error)
        res.status(500).send("Server error")
    }
})

const newPet = asyncWrapper(async (req, res) => {
    if (req.file) {
        req.body.image = String(req.file.secure_url || req.file.path);
    }
    
    try {
        const pet = await Pet.create(req.body);
        res.redirect('/pets');
    } catch (error) {
        console.error('Error creating pet:', error.message);
        res.status(400).send(error.message);
    }
});


module.exports = {newUser, users, findUser, newPet}