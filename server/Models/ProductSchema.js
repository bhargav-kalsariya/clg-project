const mongoose = require('mongoose');

const productSchema = mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    image: {
        publicId: String,
        url: String
    },

    price: {
        type: Number,
        required: true,
        min: 0
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },

}, {

    timestamps: true,

});

const Product = mongoose.model('Product', productSchema);

module.exports = { Product };