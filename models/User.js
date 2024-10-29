const mongoose = require('mongoose');

const noSpaces = (value) => {
    return !/\s/.test(value);
}

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "please provide a username"],
        trim: true,
        maxlength: [35, 'username can not exceed 35 characters'],
        validate: {
            validator: noSpaces,
            message: 'Username cannot contain spaces'
        }
    },
    password: {
        type: String,
        required: [true, "You don't want an unprotected account do you?"],
        trim: true,
        validate: {
            validator: noSpaces,
            message: 'Password cannot contain spaces'
        }
    }
})

module.exports = mongoose.model('User', UserSchema)