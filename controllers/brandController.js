const Brand = require('../models/brand')
const Product = require('../models/product')
const { validationResult } = require('express-validator')

exports.index = async (req, res, next) => {

    const brands = await Brand.find().populate('user')

    const brand = brands.map((brands, index) => {
        return {
            _id: brands._id,
            name: brands.name,
            site: brands.site,
            addedBy: brands.user.email,
            createdAt: brands.createdAt,
            updatedAt: brands.updatedAt
        }
    })

    res.status(200).json({
        data: brand
    })
}

exports.insert = async (req, res, next) => {

    try {
        const { id } = req.user

        const { name, site } = req.body

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Error: Insert Data Invalid")
            error.statusCode = 422;
            error.validation = errors.array()
            throw error;
        }

        let brands = new Brand({
            name: name,
            site: site,
            user: id
        });

        await brands.save()

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

        const brands = await Brand.findOne({
            _id: id /*req.params.id*/
        }).populate('user')

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Error: Insert Data Invalid")
            error.statusCode = 422;
            error.validation = errors.array()
            throw error;
        }

        const products = await Product.find({ "brand": id }).populate('category').populate('user').populate('brand')

        if (!brands) {
            const error = new Error("Error: Brand ID not found")
            error.statusCode = 400
            throw error;
        }
        else {

            if (!products) {
                const error = new Error("Error: Brand ID not found")
                error.statusCode = 400
                throw error;
            }
            else {
                const brand = {
                    _id: brands._id,
                    name: brands.name,
                    site: brands.site,
                    addedBy: brands.user.email,
                    createdAt: brands.createdAt,
                    updatedAt: brands.updatedAt
                }

                const product = products.map((products) => {
                    return {
                        _id: products._id,
                        name: products.name,
                        price: products.price,
                        describe: products.describe,
                        category: {
                            categoryName: products.category.name,
                            categoryDescribe: products.category.describe
                        },
                        addedBy: products.user.email,
                        createdAt: products.createdAt,
                        updatedAt: products.updatedAt
                    }

                })

                res.status(200).json({
                    data: brand,
                    brandProduct: product
                })
            }
        }


    } catch (error) {
        next(error)
    }

}

exports.drop = async (req, res, next) => {

    try {

        const { id } = req.params

        const brand = await Brand.findOne({
            _id: id
        })

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Error: Insert Data Invalid")
            error.statusCode = 422;
            error.validation = errors.array()
            throw error;
        }

        const brandDelete = await Brand.deleteOne({
            _id: id /*req.params.id*/
        })

        if (brandDelete.deletedCount === 0) {
            const error = new Error("Error: Can\'t delete data / Brand data not found.")
            error.statusCode = 400
            throw error;
        }

        res.status(200).json({
            message: brand.name + ' Data has been deleted'
        })

    } catch (error) {
        next(error)
    }

}

exports.update = async (req, res, next) => {

    try {

        const { id } = req.params

        const { name, site } = req.body

        const existId = await Brand.findOne({ _id: id })

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Error: Insert Data Invalid")
            error.statusCode = 422;
            error.validation = errors.array()
            throw error;
        }

        if (!existId) {
            const error = new Error("Error: Brand ID not found.")
            error.statusCode = 400
            throw error;
        }

        const brands = await Brand.updateOne({ _id: id }, {
            name: name,
            site: site
        })

        res.status(200).json({
            message: name + ' Data has been modified'
        })

    } catch (error) {
        next(error)
    }
}