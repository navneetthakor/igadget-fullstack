// to connect with collections 
const Admin = require('../../models/Admin');
const Order = require('../../models/Order');

// to check body parametrs 
const {validationResult} = require('express-validator');

const fetchAllOrders = async (req,res) =>{
    try{

        // validate body parameters 
        const validError = validationResult(req);
        if(!validError.isEmpty()){
            return res.status(400).json({error: validError.array(), signal: "red"});
        }
        
        // check whether it's admin or not 
        const adminId = req.admin.id;
        const admin = await Admin.findById(adminId);
        if(!admin){
            return res.status(401).json({error:"login with correct credentials", signal: "red"});
        }
        
        // now all set 
        // just fetch and return all orders 
        const data = await Order.find();
        return res.json({data: data, signal: "green"});
    }catch(e){
        console.log(e);
        return res.status(500).json({error: "Internal sever error", signal: "red"});
    }
}

module.exports = fetchAllOrders;