const mongoose = require('mongoose')

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name for the pet"],
        trim: true,
        maxlength: [50, 'Name can not exceed 50 characters']
    },
    breed: {
        type: String,
        required: [true, "Please provide a breed for the pet"],
        trim: true,
        maxlength: [50, 'Breed can not exceed 50 characters']
    },
    age: {
        type: Number,
        required: [true, "Please provide an age for the pet"],
        min: [0, "Age must be a positive number"],
        max: [80, "Age can not exceed 80 years"]
    },
    description: {
        type: String,
        required: [true, "Please provide a description for the pet"],
        trim: true,
        maxlength: [400, 'Description can not exceed 400 characters']
    },
    image: {
        type: String,
        required: [true, "Please provide an image for the pet"],
        trim: true
    },
    behavior: {
        type: String,
        required: [true, "Please tell us how good your pet is"],
        trim: true,
        maxlength: [50, 'Behavior can not exceed 50 characters']
    },
    history: {
        type: String,
        required: [true, "Please provide some history about your pet"],
        trim: true,
        maxlength: [1000, 'History can not exceed 1000 characters']
    },
    id: {
        type: Number
    }
})

module.exports = mongoose.model('Pet', petSchema)