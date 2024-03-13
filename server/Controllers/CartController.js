const { Product } = require("../Models/ProductSchema");
const { User } = require("../Models/UserSchema");
const { Failure, Success } = require("../utilities/ResponseWrapper");

const addProductToCartHandler = async (req, res) => {

    const currentUserId = req._id;

    if (!currentUserId) {

        return res.send(Failure(404, "user not found"));

    }

    const currentUser = await User.findById(currentUserId);

    try {

        const { productId } = req.body;
        const product = await Product.findById(productId);

        if (!product) {

            return res.send(Failure(404, "product not found"));

        }

        currentUser.cart.push(product._id);
        await currentUser.save();

        return res.send(Success(200, "product added to cart successfully"));

    } catch (error) {

        return res.send(Failure(500, "no product found to add" + error.message));

    }

};

module.exports = {

    addProductToCartHandler

};