const Brand = require('../models/brand')

exports.index = async(req, res, next) => {

    const brands = await Brand.find().sort({_id:1})

    const brand = brands.map((brands, index)=>{
        return {
            _id: brands._id,
            name: brands.name,
            site: brands.site
        }
    })

    res.status(200).json({
        data: brand
    })
}

exports.insert = async(req, res, next) => {

    const { name, site } = req.body

    let brands = new Brand({
        name: name,
        site: site
    });

    await brands.save()

    res.status(200).json({
        message: name + ' Data has been added',
    })
}

exports.show = async(req, res, next) => {

    try{

        const { id } = req.params

        const brands = await Brand.findOne({
            _id: id /*req.params.id*/
        })

        if(!brands){
            const error = new Error("Error: Brand ID not found")
            error.statusCode = 400
            throw error;
        }
        else{
            const brand = {
                _id: brands._id,
                name: brands.name,
                site: brands.site
            }

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

        const brand = await Brand.findOne({
            _id: id
        })

        const brandDelete = await Brand.deleteOne({
            _id: id /*req.params.id*/
        })

        if (brandDelete.deletedCount === 0) {
            const error = new Error("Error: Can\'t delete data / Brand data not found.")
            error.statusCode = 400
            throw error;
        }
        
        res.status(200).json({
            message: brand.name +' Data has been deleted'
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

        const brands = await Brand.updateOne({ _id : id }, {
            name: name,
            site: site
        })

        res.status(200).json({
            message: name + ' Data has been modified'
        })

    } catch ( error ){
        next( error )
    }
}