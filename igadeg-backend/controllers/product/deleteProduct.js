// to connect with collections 
const Admin = require('../../models/Admin');
const Product = require('../../models/Product');
const Rating = require('../../models/Rating');

// to delete images uploaded 
const fs = require('fs');
const path = require('path');


const deleteProduct = async (req, res) => {
    try {
      // first of all check whether this request is made by admin or not
      // fetching the id provided by fetchAdmin middleware
      const adminId = req.admin.id;
  
      // gethering the details of admin with provided id
      const admin = await Admin.findById(adminId);
      if (!admin) {
        return res
          .status(401)
          .json({ error: "Authentication fail please login", signal: "red" });
      }
  
      //finding product with provided id
      const prod = await Product.findById(req.params.id);
      if (!prod) {
        return res
          .status(400)
          .json({ error: "product with provided id not exist.", signal: "red" });
      }
  
      // admin autheticated and product exist in backend
      // so all safe now delete the product
  
      // first delete images
      if(prod.images){
        for(let imageName of prod.images){
          if(imageName !== null){
            const imagePath = path.join(__dirname,'../..', imageName);
            fs.unlinkSync(imagePath);
          }
        }
      } 

        // to delete it's rating document 
        const rating = await Rating.findOneAndDelete({product_id: req.params.id});
      
        // delete product 
      await Product.findByIdAndDelete(req.params.id);
      // ------email to admin-------
      return res.json({ signal: "green" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ email: "Internal server error", signal: "red" });
    }
  };

  module.exports = deleteProduct;