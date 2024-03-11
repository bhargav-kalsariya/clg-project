const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        select: false,
        required: true,
    },

    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    }]

}, {

    timestamps: true

});

const User = mongoose.model('User', userSchema);

module.exports = { User };