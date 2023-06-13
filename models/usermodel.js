const mongoose = require('mongoose');

const UserModel = mongoose.model('User', {
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    admin: {
        type: Boolean
    }
})

module.exports = UserModel