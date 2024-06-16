// to connect with collection 
const Product = require('../../models/Product');

const fetchCategoryProducts = async (req,res)=>{

    try {
      const {category= 'laptop'} = req.query;
  
      const prods = await Product.find({category: category})
  
      res.json(prods);
    } catch (e) {
      console.log(e);
      res.status(500).send("some error occured");
    }
  
  };
  
  module.exports = fetchCategoryProducts