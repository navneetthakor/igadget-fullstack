// to connect with collection of mongoDB 
const Admin = require('../../models/Admin');

// to encrypt the password 
const bcrypt = require('bcryptjs');

// to provide authentication token 
const jwt = require('jsonwebtoken');

// to validate body
const {validationResult} = require('express-validator');

// to delete image from disk storage 
const fs = require('fs');
const path = require('fs');


const createAdmin = async (req,res)=>{
    try {
    //cheking the validation satisfaction that we have specified above
    const err = validationResult(req);
    if(!err.isEmpty()){
        // delete uploaded image 
        if(req.file) fs.unlinkSync(path.join(__dirname,'../..', req.file.path));
        return res.status(400).json({error: err.array(), signal: 'red'});
    }

    //cheking whether any admin exists with the same email
    const admin = await Admin.findOne({email: req.body.email});
    if(admin){
        // delete uploaded image 
        if(req.file) fs.unlinkSync(path.join(__dirname,'..', req.file.path));
        return res.status(400).json({error: "Admin with the same email already exists", signal: 'red'});
    }

    // encrypt the password 
    const salt = await bcrypt.genSaltSync(10);
    const securepas = await bcrypt.hashSync(req.body.password, salt);

    // creating the Admin for mongoose schema (it will add new this details in database directly.)
    const createdAdmin = new Admin({
        image: req.file? req.file.path: "",
        name: req.body.name,
        email: req.body.email,
        password: securepas,
        mobile: req.body.mobile ? req.body.mobile : "",
    });

    createdAdmin.save();

    //jsonwebtoken related
    const data = {
        admin:{
            id: createdAdmin._id
        }
    }
    const jwt_secret = "tonystarkismyrolemodel";
    const authtoken = jwt.sign(data, jwt_secret);
    res.json({authtoken: authtoken, signal: 'green'});

    }catch(e){
        console.log(error);
        
        // delete uploaded image 
        if(req.file) fs.unlinkSync(path.join(__dirname,'..', req.file.path));
        res.status(500).json({email: "some error occured", signal: 'red'});
    }

}

module.exports = createAdmin;