// to connect with collections 
const Customer = require('../../models/Customer');
const Order = require('../../models/Order');

// to check body parameters 
const {validationResult, check} = require('express-validator');

const fetchCustomerOrders = async (req,res) => {
    try{

        // validate body 
        const validError = validationResult(req);
        if(!validError.isEmpty()){
            return res.status(400).json({error: validError.array(), signal: "red"});
        }
        
        // --here we are not checking for the existance of the customer because if customer not exsits then
        // thier order will also be absent. ultimatley no harm to the backend 
        
        // check for orders and if exists then return 
        const orders = await Order.find({customer_id: req.body.customer_id});
        return res.json({orders: orders, signal: "green"});
    }catch(e){
        console.log(e);
        return res.status(500).json({erro: "Internal server error", signal: "red"});
    }

}

module.exports = fetchCustomerOrders;