const User = require('../models/User');
const Pet = require('../models/Pet')
const asyncWrapper = require('../middleware/async');
const {createCustomError} = require('../errors/custom-error');
const multer = require('multer')
const cloudinary = require('cloudinary').v2

const newUser = asyncWrapper(async (req, res) => {
    const user = User.create(req.body);
    console.log(req.body);
    res.redirect('/index')
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
            res.redirect('/index')

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
        const {name, breed, age, description, image, behavior, history} = req.body
        const contact = []
        const pets = await Pet.find({})
        const id = pets.length+1
        const newPet = new Pet({ name, breed, age, description, image, behavior, history, contact, id })
        await newPet.save()
        res.redirect('/pets');
    } catch (error) {
        console.error('Error creating pet:', error.message);
        res.status(400).send(error.message);
    }
});

const newComment = asyncWrapper(async (req, res) => {
    try {
        const {contact} = req.body
        const pet = await Pet.findOne({id: req.params.id})
        pet.contact.push(contact)
        await pet.save()
        res.redirect('/pet/'+req.params.id)
    }catch(error){
        console.error('Error creating comment:', error.message);
        res.status(400).send(error.message);
    }
})

const updatePet = asyncWrapper(async (req, res) => {
    try {
        const pet = await Pet.findOneAndUpdate({id: req.params.id}, req.body, {
            new: true,
            runValidators: true
        })
        res.redirect('/pets')
    } catch (error) {
        console.error('Error updating pet:', error.message);
        res.status(400).send(error.message);
    }
})
module.exports = {newUser, users, findUser, newPet, newComment, updatePet}