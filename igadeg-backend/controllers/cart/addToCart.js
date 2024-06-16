// to connect with cart collection 
const Cart = require('../../models/Cart');
const Customer = require('../../models/Customer');
const Product = require('../../models/Product');

// to validate body 
const {validationResult} = require('express-validator');


const addToCart = async(req,res) =>{
    try{

        // check whether id got or not 
        if(req.custmr.id === undefined || req.custmr.id === null) {
            return res.status(401).json({error: "custmrtoken is not available, please login again" , signal: "red"});
        }

        // check whether body is appropriate or not 
        const validErro = validationResult(req);
        if(!validErro.isEmpty()){
            return res.status(401).json({error: validErro.array(), signal: "red"});
        }
        
        // check whether customer exists or not 
        const custmr = await Customer.findById(req.custmr.id);
        if(!custmr){
            return res.status(401).json({message: "customer not exists", signal: "red"});
        }
        
        // check whether product exists or not 
        const product = await Product.findById(req.body.product_id);
        if(!product){
            return res.status(401).json({message: "Product doesn't exists", signal: "red"})
        }
        
        // now product and customer both exists 
        // so it's safe to add iteam to customers cart 
        const cart = await Cart.find({customer_id: req.custmr.id});

        // crearing new iteam 
        const newIteam = {
            product_id: req.body.product_id,
            quantity: req.body.quantity
        }

        // now finally add object 
        const newCart = await Cart.findByIdAndUpdate(
            cart[0]._id,
            {$push : {cart_prods: newIteam}},
            {new: true}
        )

        // return response 
        return res.json({cart: newCart, signal: "green"});
    }
    catch(e){
        console.log(e);
        return res.status(500).json({message: "internal server Error", signal: "red"});
    }
}

module.exports = addToCart;