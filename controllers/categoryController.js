const Category = require('../models/category')

exports.index = async(req, res, next) => {

    const category = await Category.find().sort({_id:1})
    
    res.status(200).json({
        data: category
    })
}

exports.insert = async(req, res, next) => {

    const { name, describe } = req.body

    let category = new Category({
        name: name,
        describe: describe
    });

    await category.save()

    res.status(200).json({
        message: name + ' data has added',
    })
}

exports.show = async(req, res, next) => {

    try{

        const { id } = req.params

        const category = await Category.findOne({
            _id: id /*req.params.id*/
        })

        if(!category){
            const error = new Error("Error: Category ID not found")
            error.statusCode = 400
            throw error;
        }
        else{
            res.status(200).json({
                data: category
            })
        }


    } catch ( error ){
        next( error )
    }

}

exports.drop = async(req, res, next) => {

    try{

        const { id } = req.params

        const category = await Category.deleteOne({
            _id: id /*req.params.id*/
        })

        if (category.deletedCount === 0) {
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
        const { name, describe } = req.body

        const existId = await Category.findOne({ _id : id })

        if (!existId){
            const error = new Error("Error: Category ID not found.")
            error.statusCode = 400
            throw error;
        }

        const category = await Category.updateOne({ _id : id }, {
            name: name,
            describe: describe
        })

        res.status(200).json({
            message: name + ' data has modified'
        })

    } catch ( error ){
        next( error )
    }
}