// to connect with Cart collection 
const Cart = require('../../models/Cart');
const Customer = require('../../models/Customer');

// to check parameters provided in body 
const {validationResult} = require('express-validator');

const deleteToFav = async(req,res) =>{
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

        // now customer exists so it's safe to delete listed iteam 
        // fist find cart 
        const cart = await Cart.find({customer_id: req.custmr.id});

        // filter fav 
        const filteredCart = cart[0].fav_prods?.filter((iteam) => {
            return iteam.product_id.toString() !==  req.body.product_id;
        })
        
        // finally update fav
        const newCart = await Cart.findByIdAndUpdate(
            cart[0]._id,
            {$set: {fav_prods: filteredCart}},
            {new : true}
        )

        // now return updated fav 
        return res.json({cart: newCart, signal: "green"});

    }catch(e){
        console.log(e);
        return res.status(500).json({message: "Internel server Error", signal: "red"});
    }
}

module.exports = deleteToFav;