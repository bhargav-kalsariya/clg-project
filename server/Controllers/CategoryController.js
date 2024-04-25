const cloudinary = require('cloudinary').v2;
const { Category } = require("../Models/CategorySchema");
const { Product } = require('../Models/ProductSchema');
const { Failure, Success } = require("../utilities/ResponseWrapper");

const getAllCategoiesHandler = async (req, res) => {

    const category = await Category.find();

    if (!category) {

        return res.send(Failure(404, 'category not found'));

    }

    return res.send(Success(200, { category }));

};

const createCategoryHandler = async (req, res) => {

    const { name, image } = req.body;

    if (!name || !image) {

        return res.send(Failure(404, 'All fields are required'));

    }

    const cloudImg = cloudinary.uploader.upload(image, {
        folder: 'clg project'
    })

    try {

        const createdCategory = await Category.create({
            name,
            image: {
                publicId: (await cloudImg).public_id,
                url: (await cloudImg).secure_url
            }
        });

        return res.send(Success(201, { createdCategory }));

    } catch (error) {

        return res.send(Failure(500, 'error while creating category' + error.message));

    }

};

const deleteCategoryHandler = async (req, res) => {

    const { categoryId } = req.params;

    try {

        await Category.findByIdAndDelete(categoryId);
        await Product.deleteMany({ category: categoryId });

        return res.send(Success(200, 'Category deleted successfully'));

    } catch (error) {

        return res.send(Failure(500, `Error while deleting Category ${error.message}`));

    }

};

module.exports = {

    getAllCategoiesHandler,
    createCategoryHandler,
    deleteCategoryHandler

}