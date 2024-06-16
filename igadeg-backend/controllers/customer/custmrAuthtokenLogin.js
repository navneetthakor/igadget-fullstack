// to connect with collection in mongoDb 
const Customer = require('../../models/Customer');

const custmrAuthtokenLogin = async (req,res)=>{

    try {
        // fetching the id provided by fetchCustomer middleware 
        const custmrId = req.custmr.id;

        // gethering the details of custmr with provided id 
        const custmr = await Customer.findById(custmrId).select("-password");
        if(!custmr){
           return res.status(401).json({error: "Authentication fail please login", signal: 'red'});
        }
        return res.json({custmr:custmr, signal: 'green'});

    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal Server Error", signal: "red"}); 
    }
 };

 module.exports = custmrAuthtokenLogin;