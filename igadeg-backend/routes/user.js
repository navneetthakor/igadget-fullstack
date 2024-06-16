// to use the express 
const express = require('express');
const router = express.Router();

// to validate the given parameter in request 
const {body, validationResult, check } = require('express-validator');

// to get connectivity with collection of user in database
// it is model which we created previously 
const User = require('../model/User');

// to provide authtoken (for digital signature) 
const jwt = require('jsonwebtoken');

// to encrypt the password 
const bcrypt = require('bcryptjs');

//fetchUser middleware to fetch data from auth-token
const fecthUser = require('../middleware/fetchUser');
const fetchAdmin = require('../middleware/fetchUser');

// to use admin modal 
const Admin = require('../model/Admin');


// --------------------------ROUTE:1 create user account ----------------------------------------------------------
router.post('/createuser',
[
    body("name", "please enter name").not().isEmpty(),
    body("email", "please enter valid email").isEmail(),
    body("password", "please enter password with minimum length of : 6").isLength({min:6})
],
async (req,res)=>{
    try{

    // checking the given parameters 
    const err =  validationResult(req);
    if(!err.isEmpty()){
        return res.status(400).json({error: err.array(), signal: "red"})
    }

    // check wheteher any user exists with provided email or not 
    let user = await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).json({error: "user with given email already exists", signal: "red"});
    }

    // encrypt the password using bcrypt
    const salt = await bcrypt.genSaltSync(10);
    const securePas = await bcrypt.hashSync(req.body.password, salt);

    // creating and saving user in backend 
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: securePas
    })

    // jsonwebtoken related 
    // to provide authentication token back to user 
    const data = {
        user: {
            id: User.id,
        }
    }
    const jwt_secret = "tonystarkismyrolemodel";
    const authtoken = jwt.sign(data,jwt_secret);
    return res.json({authtoken: authtoken, signal: "green"});

    }catch(e){
        console.log(e);
        res.status(500).json({email: "some error occured", signal: 'red'});
    }
})


// --------------------------ROUTE:2 login to account (previous login not require) ----------------------------------------------------------
router.post('/login',
[
    body("email", "please enter valid email").isEmail(),
    body("password", "please do enter your password").not().isEmpty()
],
async (req,res)=>{
    try{
    // check validation of parameters provided body 
    const err = validationResult(req);
    if(!err.isEmpty()){
        return res.status(400).json({error: err.array(), signal: "red"});
    }

    // check wheter any user exists with given email or not 
    const user = await User.findOne({email: req.body.email});
    if(!user){
        return res.status(400).json({error: "enter valid credentials", signal: "red"});
    }

    // check whether the password provided is correct or not 
    const passCompare = await bcrypt.compare(req.body.password, user.password);
    if(!passCompare){
        return res.status(400).json({error: "enter valid credentials", signal: "red"});
    }

    // we reach here means all details are correct 
    // so prepare authtoken to provide it back 
    const data = {
        user: {
            id: user.id
        }
    }
    const jwt_secret = "tonystarkismyrolemodel";
    const authtoken = jwt.sign(data,jwt_secret);
    res.json({authtoken: authtoken, signal: "green"});

    } catch (error) {
    console.log(error);
    res.status(500).json({error:"Internal Server Error", signal: "red"}); 
    }
})


// --------------------------ROUTE:3 login to accoutn with authtoken ( previous login not require) ----------------------------------------------------------
router.post('/getuser', fecthUser ,async (req,res)=>{

    try {

        // fetching the id provided by fetchUser middleware 
        userId = req.user.id;

        // gethering the details of user with provided id 
        const user = await User.findById(userId).select("-password");
        if(!user){
           return res.status(401).json({error: "Authentication fail please login", signal: 'red'});
        }
        return res.json({user:user, signal: 'green'});

    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal Server Error", signal: "red"}); 
    }
 })


//  ----------------------------- Route:4 fetchall Users (only for admin) ---------------
router.post('/getallcustomers', async (req,res)=>{

    try{
        // extracting admin-id privided by fetchAdmin 
        // const adminId = req.admin.id;
    
        // check whether such admin exsists or not 
        // const admin = await Admin.findById(adminId);
        // if(!admin) res.status(400).json({message: "You are not admin", signal: "red"});
    
        // now fetch all customers and send them to front-end 
        const customers = await User.find();
        res.json(customers);
        // res.json({customers: customers, signal: "green"});
    }
    catch(e){
        console.log(e);
        res.status(500).json({message: "internal server error", signal: "red"});
    }
})


module.exports = router;