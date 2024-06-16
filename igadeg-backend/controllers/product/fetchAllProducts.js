// to connect with collection 
const Product = require('../../models/Product');

const fetchAllProducts = async (req,res)=>{
    try {
    const prods = await Product.find();

    res.json(prods)
    } catch (error) {
    console.log(error);
    res.status(500).send("some error occured");
    }
}

module.exports = fetchAllProducts