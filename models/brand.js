const mongoose = require('mongoose')
const Schema = mongoose.Schema

const brandSchema = new Schema({
    name: String, // String is shorthand for {type: String}
    site: String
  }, { 
    collection: "brands", 
    versionKey: false, 
    toJSON: { virtuals: true }
  });

  brandSchema.virtual('products', {
    ref: "Product",
    localField: "_id",
    foreignField: "Brands",
  });

const brand = mongoose.model("Brands", brandSchema)

module.exports = brand