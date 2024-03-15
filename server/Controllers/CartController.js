const { Product } = require("../Models/ProductSchema");
const { User } = require("../Models/UserSchema");
const { Failure, Success } = require("../utilities/ResponseWrapper");

const addProductToCartHandler = async (req, res) => {

    const currentUserId = req._id;
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

const updateProductQuantityHandler = async (req, res) => {

    const currentUserId = req._id;
    const currentUser = await User.findById(currentUserId).populate({
        path: 'cart'
    });

    try {

        const { productId } = req.body;

        const product = await currentUser.cart.find((product) => product.id == productId);
        const index = currentUser.cart.indexOf(product);

        if (index === -1) {

            return res.send(Failure(404, "Product not found in cart"));

        } else {

            currentUser.cart[index].quantity += 1;

            await product.save();
            await currentUser.save();
            return res.send(Success(200, { currentUser }));

        }

    } catch (error) {

        return res.send(Failure(500, "no product found to increase quantity " + error.message));

    }

};

const decreaseProductQuantityHandler = async (req, res) => {

    const currentUserId = req._id;
    const currentUser = await User.findById(currentUserId).populate({
        path: 'cart'
    });

    try {

        const { productId } = req.body;

        const product = await currentUser.cart.find((product) => product.id == productId);
        const index = currentUser.cart.indexOf(product);

        if (index === -1) {

            return res.send(Failure(404, "Product not found in cart"));

        } else {

            if (currentUser.cart[index].quantity > 1) {

                currentUser.cart[index].quantity -= 1;

            } else {

                currentUser.cart.splice(index, 1);

            }

            await product.save();
            await currentUser.save();
            return res.send(Success(200, { currentUser }));

        }

    } catch (error) {

        return res.send(Failure(500, "no product found to decrease quantity " + error.message));

    }

};

const removeProductFromCartHandler = async (req, res) => {

    const currentUserId = req._id;
    const currentUser = await User.findById(currentUserId);

    try {

        const { productId } = req.body;

        const product = currentUser.cart.find((product) => product._id == productId);
        const index = currentUser.cart.indexOf(product);

        if (index !== -1) {

            currentUser.cart.splice(index, 1);
            await currentUser.save();

        } else {

            return res.send(Failure(404, "Product not found in cart"));

        }

        return res.send(Success(200, 'Product removed successfully'));

    } catch (error) {

        return res.send(Failure(500, "no product found to remove" + error.message));

    }

};

module.exports = {

    addProductToCartHandler,
    removeProductFromCartHandler,
    updateProductQuantityHandler,
    decreaseProductQuantityHandler

};