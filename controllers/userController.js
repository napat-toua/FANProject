const User = require('../models/user')
const { validationResult } = require('express-validator')
const jwt = require("jsonwebtoken")
const config = require('../config/index')

exports.index = async (req, res, next) => {

    const users = await User.find().sort({ _id: 1 })

    const user = users.map((users, index) => {
        return {
            _id: users._id,
            name: users.name,
            email: users.email,
            password: users.password,
            role: users.role,
        }
    })

    res.status(200).json({
        data: user
    })
}

exports.show = async (req, res, next) => {

    try {

        const { id } = req.params

        const users = await User.findOne({
            _id: id
        })

        if (!users) {
            const error = new Error("Error: User ID not found")
            error.statusCode = 400
            throw users;
        }
        else {
            const user = {
                _id: users._id,
                name: users.name,
                email: users.email,
                password: users.password,
                role: users.role,
            }

            res.status(200).json({
                data: user
            })
        }

    } catch (error) {
        next(error)
    }

}

exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body

        const existEmail = await User.findOne({ email: email })

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Error: Insert Data Invalid")
            error.statusCode = 422;
            error.validation = errors.array()
            throw error;
        }

        if (existEmail) {
            const error = new Error("Error: This email is already registered.")
            error.statusCode = 400
            throw error;
        }

        let users = new User();
        users.name = name,
            users.email = email,
            users.password = await users.encryptPassword(password)

        await users.save()

        res.status(200).json({
            message: name + ' Data Registered Successfully',
        })
    }
    catch (error) {
        next(error)
    }
}

exports.drop = async (req, res, next) => {

    try {

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

    } catch (error) {
        next(error)
    }

}

exports.update = async (req, res, next) => {

    try {

        const { id } = req.params
        const { name, email, password, role } = req.body

        const findUsersEmail = await User.findOne({
            _id: id
        })

        const existEmail = await User.findOne({ email: email })

        const existId = await User.findOne({ _id: id })

        if (!existId) {
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

        if (existEmail && findUsersEmail.email != req.body.email) {
            const error = new Error("Error: This email is already registered.")
            error.statusCode = 400
            throw error;
        }

        let user = new User();
        user.password = await user.encryptPassword(password)

        const users = await User.updateOne({ _id: id }, {
            role: role,
            //name: name,
            email: email,
            password: user.password
        })

        res.status(200).json({
            message: name + ' Data has been modified'
        })

    } catch (error) {
        next(error)
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        //validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Error: Insert Data Invalid")
            error.statusCode = 422;
            error.validation = errors.array()
            throw error;
        }

        const user = await User.findOne({ email: email })

        if (!user) {
            const error = new Error("Error: User not found")
            error.statusCode = 404
            throw error;
        }

        const isValid = await user.checkPassword(password)
        if (!isValid) {
            const error = new Error("Error: Password incorrect")
            error.statusCode = 401
            throw error;
        }

        // creat token
        const token = await jwt.sign({
            id: user._id,
            role: user.role,
        }, config.SECRET_KEY, { expiresIn: "7 days" })

        const d = new Date(0);
        d.setUTCSeconds(jwt.decode(token).exp);

        res.status(200).json({
            access_token: token,
            expire_in: d,
            token_type: 'Bearar',
            role: user.role
        })

    }
    catch (error) {
        next(error)
    }

}

exports.profile = (req, res, next) => {
    const { role, name, email } = req.user
    res.status(200).json({
        name: name,
        email: email,
        role: role
    })
}

exports.put_profile = async (req, res, next) => {

    try {

        const { id } = req.user
        const { name, email, password } = req.body

        const existId = await User.findOne({ _id: id })

        const existEmail = await User.findOne({ email: email })

        const findUsersEmail = await User.findOne({
            _id: id
        })

        if (!existId) {
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

        if (existEmail && findUsersEmail.email != req.body.email) {
            const error = new Error("Error: This email is already registered.")
            error.statusCode = 400
            throw error;
        }

        let user = new User();
        user.password = await user.encryptPassword(password)

        const users = await User.updateOne({ _id: id }, {
            name: name,
            email: email,
            password: user.password
        })

        res.status(200).json({
            message: name + ' Data has been modified'
        })

    } catch (error) {
        next(error)
    }
}