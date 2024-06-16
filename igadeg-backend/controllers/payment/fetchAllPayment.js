// to connect with collections in mongoDB
const Payment = require('../../models/Payment');
const Admin = require('../../models/Admin');


const fetchAllPayment = async(req,res) => {
    try{

        // check whether admin exists or not 
        const adminId = req.admin.id;
        const admin = await Admin.findById(adminId);
        if(!admin){
            return res.status(400).json({error: "admin not exists", signal: "red"});
        }
        
        // all set just fetch and reurn all the previous payments 
        const payments = await Payment.find();
        return res.json({payments: payments, signal: "green"});
    }catch(e){
        console.log(e);
        return res.status(500).json({error: "internal server error", signal: "red"});
    }

}

module.exports = fetchAllPayment;