// to connect with collections in mongoDB
const Admin = require('../../models/Admin');
const Customer = require('../../models/Customer');

const fetchAllCustomers = async (req,res)=>{

    try{
        // extracting admin-id privided by fetchAdmin 
        const adminId = req.admin.id;
    
        // check whether such admin exsists or not 
        const admin = await Admin.findById(adminId);
        if(!admin) return res.status(400).json({message: "You are not admin", signal: "red"});
    
        // now fetch all customers and send them to front-end 
        const customers = await Customer.find();
        return res.json(customers);
        // res.json({customers: customers, signal: "green"});
    }
    catch(e){
        console.log(e);
        return res.status(500).json({message: "internal server error", signal: "red"});
    }
};

module.exports = fetchAllCustomers;