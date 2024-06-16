// to connect with payment collection 
const Payment = require('../../models/Payment');

// to validate body parameters 
const {validationResult} = require('express-validator');

const fetchSinglePayment = async(req,res) => {
    try{

        // check for body parameters 
        const validError = validationResult(req);
        if(!validError.array()){
            return res.status(400).json({error: validError.array(), signal: "green"});
        }
        
        // fetch payment details and sent back 
        const paymentDetails = await Payment.findById(req.body.payment_id);
        if(!paymentDetails){
            return res.status(400).json({error: "payment not exists", signal: "red"});
        }
        
        // everything is good return response 
        return res.json({payment: paymentDetails, signal: "green"});
        
    }catch(e){
        console.log(e);
        return res.status(500).json({error: "internal server error", signal: "red"});
    }

}

module.exports = fetchSinglePayment;