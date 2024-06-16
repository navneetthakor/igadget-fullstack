// to connect with collection 
const Product = require('../../models/Product');

const fetchLimiteCategoryProducts = async(req,res)=>{

    try{
      // this are the parameters that will be provided in req
      const {page=1, pageSize=6, category='mobile'} = req.query;
      const skip = (page-1)*pageSize;
  
      const prods = await Product.find({category:category})
      .skip(skip) //to skip the data that already fetched
      .limit(pageSize) // to send limited data
      .exec();
  
      res.json({products: prods, signal: "green"});
    }
    catch(e){
      console.log(e);
      res.status(500).send("some error occured");
    }
  };

  module.exports = fetchLimiteCategoryProducts;