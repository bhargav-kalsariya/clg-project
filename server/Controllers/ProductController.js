const { Product } = require("../Models/ProductSchema");
const { Category } = require("../Models/CategorySchema");
const { Success, Failure } = require("../utilities/ResponseWrapper");
const cloudinary = require('cloudinary').v2;

const getAllProductsHandler = async (req, res) => {

    const products = await Product.find();

    return res.send(Success(200, { products }));

};

const getParticularProductHandler = async (req, res) => {

    const { productId } = req.params;

    const productDetails = await Product.findById(productId);

    if (!productDetails) {

        return res.send(Failure(404, 'product not found'));

    };

    return res.send(Success(200, { productDetails }));

};

const getProductCategoryWiseHandler = async (req, res) => {

    const { categoryId } = req.params;
    const category = await Category.findById(categoryId).populate('products');

    if (!category) {

        return res.send(Failure(404, 'product not found with this category'));

    }

    return res.send(Success(200, { products: category.products }));
}

const createProductHandler = async (req, res) => {

    const { title, description, image, price, category } = req.body;

    if (!title || !description || !image || !price || !category) {

        return res.send(Failure(404, 'All fields are required'));

    }
    const cloudImg = cloudinary.uploader.upload(image, {
        folder: 'clg project'
    })

    try {

        const createdProduct = await Product.create({
            title,
            description,
            image: {
                publicId: (await cloudImg).public_id,
                url: (await cloudImg).url
            },
            price,
            category
        });

        const categoryId = createdProduct.category;
        const currentCategory = await Category.findById(categoryId);

        currentCategory.products.push(createdProduct._id);

        await currentCategory.save();
        return res.send(Success(201, { createdProduct }));

    } catch (error) {

        return res.send(Failure(500, 'unable to create product ' + error.message));

    }

};

const deleteProductHandler = async (req, res) => {

    const { productId } = req.params;

    try {

        const product = await Product.findById(productId);

        if (!product) {

            return res.send(Failure(404, 'product not found'));

        }

        await Category.updateOne(
            { _id: product.category },
            { $pull: { products: productId } }
        )

        await Product.deleteOne({ _id: productId });

        return res.send(Success(200, 'Product deleted successfully'));

    } catch (error) {

        return res.send(Failure(500, `Error while deleting product ${error.message}`));

    }
};

const deleteCategoryHandler = async (req, res) => {

    const { categoryId } = req.params;

    try {

        const category = await Category.findById(categoryId);

        if (!category) {

            return res.send(Failure(404, 'category not found'));

        }

        return res.send(Success(200, { category }));

    } catch (error) {

        return res.send(Failure(500, `Error while deleting product ${error.message}`));

    }

};

module.exports = {

    getAllProductsHandler,
    getParticularProductHandler,
    createProductHandler,
    getProductCategoryWiseHandler,
    deleteProductHandler,
    deleteCategoryHandler

};