const { Category } = require("../Models/CategorySchema");
const { Failure, Success } = require("../utilities/ResponseWrapper");

const createCategoryHandler = async (req, res) => {

    const { name } = req.body;

    if (!name) {

        return res.send(Failure(404, 'category name is required'));

    }

    try {

        await Category.create({
            name
        });

        return res.send(Success(201, 'category created successfully'));

    } catch (error) {

        return res.send(Failure(500, 'error while creating category' + error.message));

    }

};

module.exports = {

    createCategoryHandler

}