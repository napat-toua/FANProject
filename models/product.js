const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: String, // String is shorthand for {type: String}
    price: Number,
    describe: String,
    brand: { type: Schema.Types.ObjectId, ref: 'Brands' },
    category: { type: Schema.Types.ObjectId, ref: 'Categorys' }
  }, { 
    collection: "products", 
    versionKey: false,
    toJSON: {virtuals: true}
  });

const product = mongoose.model("Products", productSchema)

module.exports = product