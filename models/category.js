const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
    name: String, // String is shorthand for {type: String}
    describe: String
  }, { 
    collection: "categorys", 
    versionKey: false, 
    toJSON: { virtuals: true }
  });

  categorySchema.virtual('products', {
    ref: "Product",
    localField: "_id",
    foreignField: "Categorys",
  });

const category = mongoose.model("Categorys", categorySchema)

module.exports = category