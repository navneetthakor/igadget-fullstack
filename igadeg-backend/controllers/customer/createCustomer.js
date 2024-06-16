// to connect with collection in backend 
const Customer = require('../../models/Customer');

// to validate body 
const {validationResult} = require('express-validator');

// to provide authtoken (for digital signature) 
const jwt = require('jsonwebtoken');

// to encrypt the password 
const bcrypt = require('bcryptjs');

// to delete image 
const fs = require('fs');
const path = require('path');
const Cart = require('../../models/Cart');

const createCustomer = async (req,res)=>{
    try{

    // checking the given parameters 
    const err =  validationResult(req);
    if(!err.isEmpty()){
        // delete uploaded file 
        if(req.file) fs.unlinkSync(path.join(__dirname,'../..', req.file.path));
        return res.status(400).json({error: err.array(), signal: "red"})
    }

    // check wheteher any custmr exists with provided email or not 
    let custmr = await Customer.findOne({email: req.body.email});
    if(custmr){
        // delete uploaded file 
        if(req.file) fs.unlinkSync(path.join(__dirname,'../..', req.file.path));
        return res.status(400).json({error: "custmr with given email already exists", signal: "red"});
    }

    // encrypt the password using bcrypt
    const salt = await bcrypt.genSaltSync(10);
    const securePas = await bcrypt.hashSync(req.body.password, salt);

    // creating and saving custmr in backend 
    const temp = new Customer({
        image: req.file ? req.file.path : "",
        name: req.body.name,
        email: req.body.email,
        password: securePas,
        mobile: req.mobile? req.mobile : ""
    })
    temp.save();

    // creating cart for customer 
    const cart = new Cart({
        customer_id: temp._id,
        cart_prods: [],
        fav_prods: [],
    })
    cart.save();

    // jsonwebtoken related 
    // to provide authentication token back to custmr 
    const data = {
        custmr: {
            id: temp.id,
        }
    }
    const jwt_secret = "tonystarkismyrolemodel";
    const custmrtoken = jwt.sign(data,jwt_secret);
    return res.json({custmrtoken: custmrtoken, signal: "green"});

    }catch(e){
        console.log(e);

        // delete uploaded file 
        if(req.file) fs.unlinkSync(path.join(__dirname,'../..', req.file.path));
        res.status(500).json({email: "some error occured", signal: 'red'});
    }
}

module.exports = createCustomer;