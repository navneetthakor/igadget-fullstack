// to connect with collections 
const Admin = require('../../models/Admin');
const Product = require('../../models/Product');

// to validate body 
const {validationResult} = require('express-validator');

// to call another api 
const axios = require('axios');

// to delete images uploaded 
const path = require('path');
const fs = require('fs');
const Rating = require('../../models/Rating');

const addProduct = async (req, res) => {
    try {
      // first of all check whether this request is made by admin or not
      // fetching the id provided by fetchAdmin middleware
      const adminId = req.admin.id;

      // gethering the details of admin with provided id
      const admin = await Admin.findById(adminId);
      if (!admin) {
        for(let i of req.files){
            fs.unlinkSync(path.join(__dirname,"../..",i.path));
        }
        return res
          .status(401)
          .json({ error: "Authentication fail please login", signal: "red" });
      }

      // check the validation for given parameters in body
      const err = validationResult(req);
      if (!err.isEmpty()) {
        for(let i of req.files){
            fs.unlinkSync(path.join(__dirname,"../..",i.path));
        }
        return res.status(400).json({ error: err.array(), signal: "red" });
      }

    //   check whether product with same sku exists or not 
      const skuProd = await Product.findOne({sku: req.body.sku});
      if(skuProd){
        for(let i of req.files){
            fs.unlinkSync(path.join(__dirname,"../..",i.path));
        }
        return res.status(400).json({ error: "product exists with same sku", signal: "red" });
      }


      let temp;
      let imagePaths = null;
      // Check if files were uploaded
      if (req.files && req.files.length > 0) {
         imagePaths = req.files.map((file) => file.path);
      }

         temp = new Product({
          images: imagePaths,
          title: req.body.title,
          desc: req.body.desc,
          company: req.body.company,
          dimension: req.body.dimension,
          weight: req.body.weight,
          mrp: req.body.mrp,
          sellprice: req.body.sellprice,
          category: req.body.category,
          sku: req.body.sku,
          stock: req.body.stock,
          soldstock: req.body.soldstock,
        });
      temp.save();

    //   create review entry in rating document 
    const url = `${process.env.BACKEND_URL}/rating/createRating`;
    const data = {product_id: temp._id};
    const response = await axios.post(url,data);
    const rating = response.data;

    if(rating.signal === "red"){
        // delete files
        for(let i of req.files){
            fs.unlinkSync(path.join(__dirname,"../..",i.path));
        }

        // delete product 
        const prod = await Product.findByIdAndDelete(temp._id);
        return res.status(400).json({ error: "product exists with same sku", signal: "red" });
    }

      return res.json({ product: temp, signal: "green" });
    } catch (e) {
      console.log(e);
    
    //   if images were uploaded then delete those images 
    if(req.files){
        for(let i of req.files){
            fs.unlinkSync(path.join(__dirname,"../..",i.path));
        }
    }
      res.status(500).json({ email: "Internal server error", signal: "red" });
    }
  };

  module.exports = addProduct;