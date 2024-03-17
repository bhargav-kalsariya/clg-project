const { Product } = require("../Models/ProductSchema");
const { User } = require("../Models/UserSchema");
const { Failure, Success } = require("../utilities/ResponseWrapper");

const addProductToCartHandler = async (req, res) => {

    const currentUserId = req._id;
    const currentUser = await User.findById(currentUserId);

    try {

        const { productId } = req.body;

        const AlreadyInCart = currentUser.cart.find((product) => product.product._id == productId);

        if (AlreadyInCart) {

            AlreadyInCart.quantity += 1;

            await currentUser.save();
            return res.send(Success(200, "product quantity increased by 1"));

        } else {

            const product = await Product.findById(productId);

            if (!product) {

                return res.send(Failure(404, "product not found"));

            }

            currentUser.cart.push({ product: product._id, quantity: 1 });
            await currentUser.save();

            return res.send(Success(200, "product added to cart successfully"));

        }


    } catch (error) {

        return res.send(Failure(500, "no product found to add" + error.message));

    }

};

const updateProductQuantityHandler = async (req, res) => {

    const currentUserId = req._id;
    const currentUser = await User.findById(currentUserId).populate({
        path: 'cart',
        populate: {
            path: 'product'
        }
    });

    try {

        const { productId } = req.body;

        const product = await currentUser.cart.find((product) => product.product._id == productId);
        const index = currentUser.cart.indexOf(product);

        if (index === -1) {

            return res.send(Failure(404, "Product not found in cart"));

        } else {

            console.log(currentUser.cart);
            currentUser.cart[index].quantity += 1;

            await product.save();
            await currentUser.save();
            return res.send(Success(200, 'quantity increase successfully'));

        }

    } catch (error) {

        return res.send(Failure(500, "no product found to increase quantity " + error.message));

    }

};

const decreaseProductQuantityHandler = async (req, res) => {

    const currentUserId = req._id;
    const currentUser = await User.findById(currentUserId).populate({
        path: 'cart',
        populate: {
            path: "product",
        }
    });

    try {

        const { productId } = req.body;

        const product = await currentUser.cart.find((product) => product.product._id == productId);
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
            return res.send(Success(200, 'quantity decrease successfully'));

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

        const product = currentUser.cart.find((product) => product.product._id == productId);
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