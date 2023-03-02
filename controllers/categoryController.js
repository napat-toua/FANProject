const Category = require('../models/category')
const Product = require('../models/product')
const { validationResult } = require('express-validator')

exports.index = async (req, res, next) => {

    const categorys = await Category.find().populate('user')

    const category = categorys.map((categorys, index) => {
        return {
            _id: categorys._id,
            name: categorys.name,
            describe: categorys.describe,
            addedBy: categorys.user.email,
            createdAt: categorys.createdAt,
            updatedAt: categorys.updatedAt
        }
    })

    res.status(200).json({
        data: category
    })
}

exports.insert = async (req, res, next) => {

    try {
        const { id } = req.user

        const { name, describe } = req.body

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Error: Insert Data Invalid")
            error.statusCode = 422;
            error.validation = errors.array()
            throw error;
        }

        let categorys = new Category({
            name: name,
            describe: describe,
            user: id
        });

        await categorys.save()

        res.status(200).json({
            message: name + ' Data has been added',
        })
    } catch (error) {
        next(error)
    }
}

exports.show = async (req, res, next) => {

    try {

        const { id } = req.params

        const categorys = await Category.findOne({
            _id: id /*req.params.id*/
        }).populate('user')

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Error: Insert Data Invalid")
            error.statusCode = 422;
            error.validation = errors.array()
            throw error;
        }

        const products = await Product.find({ "category": id }).populate('category').populate('user').populate('brand')

        if (!categorys) {
            const error = new Error("Error: Category ID not found")
            error.statusCode = 400
            throw error;
        }
        else {

            if (!products) {
                const error = new Error("Error: Category ID not found")
                error.statusCode = 400
                throw error;
            }
            else {
                const category = {
                    _id: categorys._id,
                    name: categorys.name,
                    describe: categorys.describe,
                    addedBy: categorys.user.email,
                    createdAt: categorys.createdAt,
                    updatedAt: categorys.updatedAt
                }

                const product = products.map((products) => {
                    return {
                        _id: products._id,
                        name: products.name,
                        price: products.price,
                        describe: products.describe,
                        brand: {
                            brandName: products.brand.name,
                            brandSite: products.brand.site
                        },
                        addedBy: products.user.email,
                        createdAt: products.createdAt,
                        updatedAt: products.updatedAt
                    }

                })                

                res.status(200).json({
                    data: category,
                    categoryProduct: product
                })
            }
        }


    } catch (error) {
        next(error)
    }

}

exports.products = async (req, res, next) => {

    try {

        const { id } = req.params

        const products = await Product.find({ "category": id }).populate('category').populate('user').populate('brand')

        if (!products) {
            const error = new Error("Error: Category ID not found")
            error.statusCode = 400
            throw error;
        }
        else {
            const product = products.map((products) => {
                return {
                    categoryName: products.category.name,
                    _id: products._id,
                    name: products.name,
                    price: products.price,
                    describe: products.describe,
                    brand: {
                        brandName: products.brand.name,
                        brandSite: products.brand.site
                    },
                    addedBy: products.user.email,
                    createdAt: products.createdAt,
                    updatedAt: products.updatedAt
                }

            })

            res.status(200).json({
                data: product
            })

        }


    } catch (error) {
        next(error)
    }
}

exports.drop = async (req, res, next) => {

    try {

        const { id } = req.params

        const category = await Category.findOne({
            _id: id
        })

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Error: Insert Data Invalid")
            error.statusCode = 422;
            error.validation = errors.array()
            throw error;
        }

        const categoryDelete = await Category.deleteOne({
            _id: id /*req.params.id*/
        })

        if (categoryDelete.deletedCount === 0) {
            const error = new Error("Error: Can\'t delete data / Company data not found.")
            error.statusCode = 400
            throw error;
        }

        res.status(200).json({
            message: category.name + ' Data has been deleted'
        })

    } catch (error) {
        next(error)
    }

}

exports.update = async (req, res, next) => {

    try {

        const { id } = req.params

        const { name, describe } = req.body

        const existId = await Category.findOne({ _id: id })

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Error: Insert Data Invalid")
            error.statusCode = 422;
            error.validation = errors.array()
            throw error;
        }

        if (!existId) {
            const error = new Error("Error: Category ID not found.")
            error.statusCode = 400
            throw error;
        }

        const categorys = await Category.updateOne({ _id: id }, {
            name: name,
            describe: describe
        })

        res.status(200).json({
            message: name + ' Data has been modified'
        })

    } catch (error) {
        next(error)
    }
}