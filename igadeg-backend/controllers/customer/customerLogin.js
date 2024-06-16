// to connect with collection in mongoDB 
const Customer = require('../../models/Customer');

// to validate body 
const {validationResult} = require('express-validator');

// to provide authtoken (for digital signature) 
const jwt = require('jsonwebtoken');

// to encrypt the password 
const bcrypt = require('bcryptjs');

const customerLogin = async (req,res)=>{
    try{
    // check validation of parameters provided body 
    const err = validationResult(req);
    if(!err.isEmpty()){
        console.log(req.body);
        return res.status(400).json({error: err.array(), signal: "red"});
    }

    // check wheter any custmr exists with given email or not 
    const custmr = await Customer.findOne({email: req.body.email});
    if(!custmr){
        return res.status(400).json({error: "enter valid credentials", signal: "red"});
    }

    // check whether the password provided is correct or not 
    const passCompare = await bcrypt.compare(req.body.password, custmr.password);
    if(!passCompare){
        return res.status(400).json({error: "enter valid credentials", signal: "red"});
    }

    // we reach here means all details are correct 
    // so prepare authtoken to provide it back 
    const data = {
        custmr: {
            id: custmr.id
        }
    }
    const jwt_secret = "tonystarkismyrolemodel";
    const custmrtoken = jwt.sign(data,jwt_secret);
    res.json({custmrtoken: custmrtoken, signal: "green"});

    } catch (error) {
    console.log(error);
    res.status(500).json({error:"Internal Server Error", signal: "red"}); 
    }
};

module.exports = customerLogin;