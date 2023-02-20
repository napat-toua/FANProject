const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: { type:String, require: true, trim: true},
    email: { type:String, require: true, trim: true, unique: true, index: true},
    password: { type:String, require: true, trim: true, minlength: 5},
    role: { type:String, default: 'member'}
}, { collection: "users", versionKey: false});

const brand = mongoose.model("Users", userSchema)

module.exports = brand