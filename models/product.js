const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
  name: { type: String, require: true, trim: true },
  price: { type: Number, require: true },
  describe: { type: String, trim: true },
  brand: { type: Schema.Types.ObjectId, require: true, ref: 'Brands' },
  category: { type: Schema.Types.ObjectId, require: true, ref: 'Categorys' },
  user: { type: Schema.Types.ObjectId, require: true, ref: 'Users' }
}, { collection: "products", versionKey: false, timestamps: true });

const product = mongoose.model("Products", productSchema)

module.exports = product