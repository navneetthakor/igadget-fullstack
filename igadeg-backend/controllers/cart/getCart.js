// to connect with collection 
const Cart = require('../../models/Cart');
const Customer = require('../../models/Customer');
const Product = require('../../models/Product');

const getCart = async(req,res) =>{
    try{
        // check whether id got or not 
        if(req.custmr.id === undefined || req.custmr.id === null) {
            return res.status(401).json({error: "custmrtoken is not available, please login again" , signal: "red"});
        }
        
        // now check whether custmr exists or not 
        const custmr = await Customer.findById(req.custmr.id);
        if(!custmr){
            return res.status(401).json({error: "user doesn't exists", signal: "red"});
        }
        
        // now all set to return cart 
        const cart = await Cart.findOne({customer_id: req.custmr.id});

        // fetch all the products and set it in object 
        let ansObj = {
            cart_prods: [],
            fav_prods: []
        };

        for(let i of cart.cart_prods){
            let prod = await Product.findById(i.product_id);
            prod = {prod, ct: i.quantity};
            ansObj.cart_prods.push(prod);
        }
        for(let i of cart.fav_prods){
            let prod = await Product.findById(i.product_id);
            prod = {prod, ct: i.quantity};
            ansObj.fav_prods.push(prod);
        }

        return res.json({cart: ansObj, signal: "green"});
    }
    catch(e){
        console.log(e);
        return res.status(500).json({error: "Interner server Error", signal: "red"});
    }
}

module.exports = getCart;