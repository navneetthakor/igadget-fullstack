const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ProductSchema = new Schema({
  images: [
    {
      type: String,
      required: true,
    },
  ],
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    require: true,
  },
  dimension:{
    type: String,
    require: true,
  },
  weight: {
    type: Number,
    require:true,
  },
  mrp: {
    type: Number,
    require: true,
  },
  sellprice: {
    type: Number,
    require: true,
  },
  category: {
    type: String,
    required: true
  },
  sku:{
    type: String,
    require: true,
    unique: true,
  },
  stock: {
    type: Number,
    require: true
  },
  soldstock:{
    type: Number,
    require: true,
    default: 0,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

module.exports = model("Products", ProductSchema);

// products = {
//     images,
//     title,
//     desc,
//     company,
//     dimension,
//     weight,
//     mrp,
//     sellprice,
//     stock,
//     soldstock,
//     category,
//     sku,
//     date,
// }
