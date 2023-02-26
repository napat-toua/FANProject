const Product = require('../models/product')

exports.index = async(req, res, next) => {

    const products = await Product.find().populate('brand').populate('category') //brand = products collection: field brand
    
    const product = products.map((products, index)=>{
        return {
            _id: products._id,
            name: products.name,
            price: products.price, 
            describe: products.describe, 
            brand: {
                brandID: products.brand._id,
                brandName: products.brand.name,
                brandSite: products.brand.site
            }, 
            category: {
                categoryID: products.category._id,
                categoryName: products.category.name,
                categoryDescribe: products.category.describe
            }
        }
    })

    res.status(200).json({
        data: product
    })
}

exports.insert = async(req, res, next) => {

    const { name, price, describe, brand, category } = req.body

    let products = new Product({
        name: name,
        price: price, 
        describe: describe, 
        brand: brand, 
        category, category
    });

    await products.save()

    res.status(200).json({
        message: name + ' Data has been added',
    })
}

exports.show = async(req, res, next) => {

    try{

        const { id } = req.params

        const products = await Product.findOne({
            _id: id /*req.params.id*/
        }).populate('brand').populate('category')

        if(!products){
            const error = new Error("Error: Product ID not found")
            error.statusCode = 400
            throw error;
        }
        else{
            const product = {
                _id: products._id,
                name: products.name,
                price: products.price, 
                describe: products.describe, 
                brand: {
                    brandID: products.brand._id,
                    brandName: products.brand.name,
                    brandSite: products.brand.site
                }, 
                category: {
                    categoryID: products.category._id,
                    categoryName: products.category.name,
                    categoryDescribe: products.category.describe
                }
                }

            res.status(200).json({
                data: product
            })
        }


    } catch ( error ){
        next( error )
    }

}

exports.drop = async(req, res, next) => {

    try{

        const { id } = req.params

        const product = await Product.findOne({
            _id: id
        })

        const productDelete = await Product.deleteOne({
            _id: id /*req.params.id*/
        })

        if (productDelete.deletedCount === 0) {
            const error = new Error("Error: Can\'t delete data / Product data not found.")
            error.statusCode = 400
            throw error;
        }
        
        res.status(200).json({
            message: product.name + ' Data has been delete'
        })
        
    } catch ( error ){
        next( error )
    }

}

exports.update = async(req, res, next) => {

    try{

        const { id } = req.params
        const { name, price, describe } = req.body

        const existId = await Product.findOne({ _id : id })

        if (!existId){
            const error = new Error("Error: Product ID not found.")
            error.statusCode = 400
            throw error;
        }

        const products = await Product.updateOne({ _id : id }, {
            name: name,
            price: price, 
            describe: describe
        })

        res.status(200).json({
            message: name + ' Data has been modified'
        })

    } catch ( error ){
        next( error )
    }
}