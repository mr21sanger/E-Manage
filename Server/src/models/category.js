const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    uppercase: true
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

const CategoryModel = new mongoose.model("category", categorySchema)

module.exports = CategoryModel;