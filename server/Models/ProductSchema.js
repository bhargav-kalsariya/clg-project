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
        type: String,
        required: true
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

    quantity: {
        type: Number,
        required: true,
        min: 0
    }

}, {

    timestamps: true,

});

const Product = mongoose.model('Product', productSchema);

module.exports = { Product };