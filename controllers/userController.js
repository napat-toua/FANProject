const User = require('../models/user')
const { validationResult } = require('express-validator')

exports.index = async(req, res, next) => {

    const users = await User.find().sort({_id:1})
    
    res.status(200).json({
        data: users
    })
}

exports.show = async(req, res, next) => {

    try{

        const { id } = req.params

        const users = await User.findOne({
            _id: id
        })

        if(!users){
            const error = new Error("Error: User ID not found")
            error.statusCode = 400
            throw users;
        }
        else{
            res.status(200).json({
                data: users
            })
        }


    } catch ( error ){
        next( error )
    }

}

exports.register = async(req, res, next) => {
    try{
        const { name, email, password } = req.body

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Error: Insert Data Invalid")
            error.statusCode = 422;
            error.validation = errors.array()
            throw error;
        }

        let users = new User({
            name: name,
            email: email,
            password: password
        });

        await users.save()

        res.status(200).json({
            message: name + ' Data has been added',
        })
    }
    catch ( error ) {
        next( error )
      }
}

exports.drop = async(req, res, next) => {

    try{

        const { id } = req.params

        const user = await Category.findOne({
            _id: id
        })

        const userDelete = await User.deleteOne({
            _id: id /*req.params.id*/
        })

        if (userDelete.deletedCount === 0) {
            const error = new Error("Error: Can\'t delete data / User data not found.")
            error.statusCode = 400
            throw error;
        }
        
        res.status(200).json({
            message: user.name + ' Data has been deleted'
        })
        

    } catch ( error ){
        next( error )
    }

}

exports.update = async(req, res, next) => {

    try{

        const { id } = req.params
        const { name, email, password } = req.body

        const existId = await User.findOne({ _id : id })

        if (!existId){
            const error = new Error("Error: User ID not found.")
            error.statusCode = 400
            throw error;
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Error: Insert Data Invalid")
            error.statusCode = 422;
            error.validation = errors.array()
            throw error;
        }

        const users = await User.updateOne({ _id : id }, {
            name: name,
            email: email,
            password: password
        })

        res.status(200).json({
            message: name + ' Data has been modified'
        })

    } catch ( error ){
        next( error )
    }
}