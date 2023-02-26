const Category = require('../models/category')

exports.index = async(req, res, next) => {

    const categorys = await Category.find().sort({_id:1})
    
    const category = categorys.map((categorys, index)=>{
        return {
            _id: categorys._id,
            name: categorys.name,
            describe: categorys.describe
        }
    })

    res.status(200).json({
        data: category
    })
}

exports.insert = async(req, res, next) => {

    const { name, describe } = req.body

    let categorys = new Category({
        name: name,
        describe: describe
    });

    await categorys.save()

    res.status(200).json({
        message: name + ' Data has been added',
    })
}

exports.show = async(req, res, next) => {

    try{

        const { id } = req.params

        const categorys = await Category.findOne({
            _id: id /*req.params.id*/
        })

        if(!categorys){
            const error = new Error("Error: Category ID not found")
            error.statusCode = 400
            throw error;
        }
        else{
            const category = {
                _id: categorys._id,
                name: categorys.name,
                describe: categorys.describe
            }

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

        const category = await Category.findOne({
            _id: id
        })

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

        const categorys = await Category.updateOne({ _id : id }, {
            name: name,
            describe: describe
        })

        res.status(200).json({
            message: name + ' Data has been modified'
        })

    } catch ( error ){
        next( error )
    }
}