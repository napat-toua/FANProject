const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
    name: String, // String is shorthand for {type: String}
    describe: String
  }, { collection: "categorys", versionKey: false});

const category = mongoose.model("Categorys", categorySchema)

module.exports = category