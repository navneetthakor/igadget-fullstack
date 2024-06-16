// to connect with cart collection 
const Cart = require('../../models/Cart');

// to check for body 
const {validationResult} = require('express-validator');



const createCart = async (req,res) => {
    try{

        // check for body requirements 
        const validErr = validationResult(req);
        if(!validErr.isEmpty()){
            return res.status(401).json({error: validErr.array(), signal: "red"});
        }
        
        // now create cart 
        let newCart = new Cart({
            customer_id: req.body.customer_id,
            cart_prods: [],
            fav_prods: []
        })
        newCart.save();
        
        return res.json({cart: newCart, signal: "green"});
    }
    catch(e){
        console.log(e);
        return res.status(500).json({message: "internal server error", signal: "red"});
    }
}

module.exports = createCart;