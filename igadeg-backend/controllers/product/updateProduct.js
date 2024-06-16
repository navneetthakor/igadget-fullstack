// to connect with collctions 
const Admin = require('../../models/Admin');
const Product = require('../../models/Product');

// to delete and upload files 
const fs = require('fs');
const path = require('path');

const updateProducts = async (req, res) => {
    try {
      // first of all check whether this request is made by admin or not
      // fetching the id provided by fetchAdmin middleware
      const adminId = req.admin.id;
  
      // gethering the details of admin with provided id
      const admin = await Admin.findById(adminId);
      if (!admin) {
        // first delete uploaded images 
        if (req.files && req.files.length > 0) {
          for(let imageName of req.files){
            console.log(imageName);
            const imagePath = path.join(__dirname,'../..', imageName);
            fs.unlinkSync(imagePath);
          }
        }
  
        return res
          .status(401)
          .json({ error: "Authentication fail please login", signal: "red" });
      }
  
      // find product to be update
      const findProd = await Product.findById(req.params.id);
      if (!findProd) {
        // first delete uploaded images 
        if (req.files && req.files.length > 0) {
          for(let image of req.files){
            const imagePath = path.join(__dirname,'../..', image.path);
            fs.unlinkSync(imagePath);
          }
        }
  
        return res
          .status(400)
          .json({ error: "product not exist", signal: "red" });
      }
  
      // creating a temporory product to store parameters provided in request
      const {
        title,
        desc,
        company,
        dimension,
        weight,
        mrp,
        sellprice,
        category,
        stock,
        soldstock,
      delImages} = req.body;
      const prod = {};
  
      if (title) {
        prod.title = title;
      }
      if (desc) {
        prod.desc = desc;
      }
      if (dimension) {
        prod.dimension = dimension;
      }
      if (mrp) {
        prod.mrp = mrp;
      }
      if (category) {
        prod.category = category;
      }
      if (company) {
        prod.company = company;
      }
      if (sellprice) {
        prod.sellprice = sellprice;
      }
      if (weight) {
        prod.weight = weight;
      }
      if (stock) {
        prod.stock = stock;
      }
      if (soldstock) {
        prod.soldstock = soldstock;
      }
  
      // Check if files were uploaded
      if (req.files && req.files.length > 0) {
        prod.images = req.files.map((file) => file.path);
      }
      
      // deleting images from backend
      if(delImages){
        for(let imageName of delImages){
          if(imageName !== null){
            const imagePath = path.join(__dirname,'../..', imageName);
            fs.unlinkSync(imagePath);
            findProd.images = findProd.images?.filter((img) => {return img !== imageName});
          }
        }
      }
  
      // add remaining images of old product to new one 
      if(findProd.images && prod.images !== null){
        prod.images = findProd.images.concat(prod.images);
      }else{
        prod.images = findProd.images;
      }
  
      // now all safe to update the product
      const updatProd = await Product.findByIdAndUpdate(
        req.params.id,
        { $set: prod },
        { new: true }
      );
      res.json({ product: updatProd, signal: "green" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ email: "Internal server error", signal: "red" });
    }
  };

  module.exports = updateProducts;