// to use for routing provided by express 
const express = require('express');
const router = express.Router();

// to identify the user by authtoken 
const fetchUser = require('../middleware/fetchUser');
const { verify } = require('jsonwebtoken');

// to verify the parameters provided in body 
const {body, validationResult} = require('express-validator');

// imported mongoose models to access database 
const Purchase = require('../model/Purchase');
const Product = require('../model/Product');
const User = require('../model/User');

// --------------------------ROUTE:1 ADD PURCHASE DETAILS-------------------------------
router.post('/add',
[
    body("pid","please enter the valid product id").not().isEmpty(),
    body("quantity", "please enter valid quantity").isNumeric(),
    body("price","enter valid price").isNumeric()
],
 fetchUser,
 async(req,res)=>{
    try {
        // fetching the id provided by fetchUser middleware 
        userId = req.user.id;
        
        // gethering the details of user with provided id 
        const user = await User.findById(userId).select("-password");
        if(!user){
            return res.status(401).json({error: "Authentication fail please login", signal: 'red'});
        }

        // chaking the validation of provided body parameters;
        const err = validationResult(req);
        if(!err.isEmpty()){
            return res.status(400).json({error: err.array(), signal:"red"});
        }

        //check whether product exist for given pid
        const prod = Product.findById(req.body.pid);
        if(!prod){
            return res.json({error: "product not exist", signal: "red"});
        }

        // now all set to add new purchase entry 
        Purchase.create({
            uid: req.user.id,
            pid: req.body.pid,
            quantity: req.body.quantity,
            price: req.body.price
        })
        return res.json({signal: "green"});
    } catch (error) {
        res.status(400).json({error: "Internal server error", signal: "red"});
    }
})

module.exports = router;