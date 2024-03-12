const { Product } = require("../Models/ProductSchema");
const { Category } = require("../Models/CategorySchema");
const { Success, Failure } = require("../utilities/ResponseWrapper");

const getAllProductsHandler = async (req, res) => {

    const products = await Product.find();

    return res.send(Success(200, { products }));

}

const createProductHandler = async (req, res) => {

    const { title, description, image, price, quantity, category } = req.body;

    if (!title || !description || !image || !price || !quantity || !category) {

        return res.send(Failure(404, 'All fields are required'));

    }

    try {

        const createdProduct = await Product.create({
            title,
            description,
            image,
            price,
            quantity,
            category
        });

        const categoryId = createdProduct.category;
        const currentCategory = await Category.findById(categoryId);

        currentCategory.products.push(createdProduct._id);

        await currentCategory.save();
        return res.send(Success(201, 'Product created successfully'));

    } catch (error) {

        return res.send(Failure(500, 'unable to create product ' + error.message));

    }

};

module.exports = {

    getAllProductsHandler,
    createProductHandler

}