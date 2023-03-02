const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
    name: String, // String is shorthand for {type: String}
    describe: String,
    user: { type: Schema.Types.ObjectId, ref: 'Users' }
  }, { 
    collection: "categorys", 
    versionKey: false, 
    toJSON: { virtuals: true },
    timestamps: true
  });

  categorySchema.virtual('products', {
    ref: "Product",
    localField: "_id",
    foreignField: "Categorys",
  });

const category = mongoose.model("Categorys", categorySchema)

module.exports = category