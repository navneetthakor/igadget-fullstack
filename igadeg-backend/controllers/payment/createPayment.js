// to connect with collection 
const Payment = require('../../models/Payment');

// to check parameters provided in body 
const {validationResult} = require('express-validator');

const createPayment = async(req,res) => {
    try{

        // check whether parameters are appropriate or not in body 
        const validError = validationResult(req);
        if(!validError.isEmpty()){
            return res.status(400).json({error: validError.array(), signal: "red"});
        }
        
        // we are not checking for the customer because that is already done in Order.js and then request is created to 
        // add payment details 
        
        // if payment method is cash on delivery then 
        if(req.body.method === "cod"){
            const payDetails = new Payment({
                customer_id: req.body.customer_id,
                amount: req.body.amount,
                method: "cod",
                country: req.body.country
            })
            
            payDetails.save();
            return res.json({payment: payDetails, signal: "green"});
        }
        
        // code reaches here means payment is made through stripe 
        const payDetails = new Payment({
            customer_id: req.body.customer_id,
            amount: req.body.amount,
            session_id: req.body.session_id,
            method: "stripe",
            country: req.body.country
        })
        
        payDetails.save();
        return res.json({payment: payDetails, signal: "green"});
    }catch(e){
        console.log(e);
        return res.status(500).json({error: "Internal server error paymentcreate", signal: "red"});
    }
}

module.exports = createPayment;