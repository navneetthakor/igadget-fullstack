// to connect with collection 
const Order = require('../../models/Order');
const Payment = require('../../models/Order');

// to check body parameters 
const {validationResult} = require('express-validator');

const fetchSingleOrder = async (req,res) =>{
    try{

        // validate body 
        const validError = validationResult(req);
        if(!validError.isEmpty()){
            return res.status(400).json({error: validError.array(), signal: "red"});
        }

        // now fetch order and if exists then return 
        const order = await Order.findById(req.body.order_id);
        if(!order){
            return res.status(400).json({error: "order not exists", signal: "red"});
        }
    
        return res.json({order: order, signal: "green"});
    }catch(e){
        console.log(e);
        return res.status(500).json({error: "internal server error", signal: "red"});
    }
}

module.exports = fetchSingleOrder;