const mongoose = require('mongoose')
const Schema = mongoose.Schema

const brandSchema = new Schema({
  name: { type: String, require: true, trim: true },
  site: { type: String, require: true, trim: true },
  user: { type: Schema.Types.ObjectId, ref: 'Users' }
}, {
  collection: "brands",
  versionKey: false,
  toJSON: { virtuals: true },
  timestamps: true
});

brandSchema.virtual('products', {
  ref: "Product",
  localField: "_id",
  foreignField: "Brands",
});

const brand = mongoose.model("Brands", brandSchema)

module.exports = brand