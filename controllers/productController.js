const Product = require('../models/product')

exports.index = async(req, res, next) => {

    const product = await Product.find().populate('brand').populate('category') //brand = products collection: field brand
    
    res.status(200).json({
        data: product
    })
}

exports.insert = async(req, res, next) => {

    const { name, price, describe, brand, category } = req.body

    let product = new Product({
        name: name,
        price: price, 
        describe: describe, 
        brand: brand, 
        category, category
    });

    await product.save()

    res.status(200).json({
        message: name + ' data has added',
    })
}

exports.show = async(req, res, next) => {

    try{

        const { id } = req.params

        const product = await Product.findOne({
            _id: id /*req.params.id*/
        })

        if(!product){
            const error = new Error("Error: Product ID not found")
            error.statusCode = 400
            throw error;
        }
        else{
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

        const product = await Product.deleteOne({
            _id: id /*req.params.id*/
        })

        if (product.deletedCount === 0) {
            const error = new Error("Error: Can\'t delete data / Company data not found.")
            error.statusCode = 400
            throw error;
        }
        
        res.status(200).json({
            message: 'Data deleted'
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

        const product = await Product.updateOne({ _id : id }, {
            name: name,
            price: price, 
            describe: describe
        })

        res.status(200).json({
            message: name + ' data has modified'
        })

    } catch ( error ){
        next( error )
    }
}