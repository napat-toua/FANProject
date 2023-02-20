const Brand = require('../models/brand')

exports.index = async(req, res, next) => {

    const brand = await Brand.find().sort({_id:1})
    
    res.status(200).json({
        data: brand
    })
}

exports.insert = async(req, res, next) => {

    const { name, site } = req.body

    let brand = new Brand({
        name: name,
        site: site
    });
    console.log()
    await brand.save()

    res.status(200).json({
        message: name + ' data has added',
    })
}

exports.show = async(req, res, next) => {

    try{

        const { id } = req.params

        const brand = await Brand.findOne({
            _id: id /*req.params.id*/
        })

        if(!brand){
            const error = new Error("Error: Brand ID not found")
            error.statusCode = 400
            throw error;
        }
        else{
            res.status(200).json({
                data: brand
            })
        }


    } catch ( error ){
        next( error )
    }

}

exports.drop = async(req, res, next) => {

    try{

        const { id } = req.params

        const brand = await Brand.deleteOne({
            _id: id /*req.params.id*/
        })

        if (brand.deletedCount === 0) {
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
        const { name, site } = req.body

        const existId = await Brand.findOne({ _id : id })

        if (!existId){
            const error = new Error("Error: Brand ID not found.")
            error.statusCode = 400
            throw error;
        }

        const brand = await Brand.updateOne({ _id : id }, {
            name: name,
            site: site
        })

        res.status(200).json({
            message: name + ' data has modified'
        })

    } catch ( error ){
        next( error )
    }
}