// to connect with collection in mongoDb 
const Admin = require('../../models/Admin');

// to validate body 
const {validationResult} = require('express-validator');

// to encrypt the password 
const bcrypt = require('bcryptjs');

// to provide authentication token 
const jwt = require('jsonwebtoken');

const adminLogin = async(req,res)=>{
    try {
        //cheking the validation satisfaction that we have specified above
        const err = validationResult(req);
        if(!err.isEmpty()){
            return res.status(400).json({error: err.array(), signal: 'red'});
        }

        //destructuring the email and password from request
        const {email, password} = req.body;

        // admin exists or not (check for email)
        const admin = await Admin.findOne({email});
        if(!admin){
            return res.status(400).json({error: "please enter correct credentials"});
        }

        // password correct or not (check for password)
        const passCompare = await bcrypt.compare(password, admin.password);
        if(!passCompare){
            return res.status(400).json({error: "please enter correct credentials"});
        }

        // now, email and password both are correct so allow admin to login 
        // jsonwebtoken related 
        const data = {
            admin: {
                id: admin.id
            }
        }
        const jwt_secret = "tonystarkismyrolemodel";
        const authtoken = jwt.sign(data, jwt_secret);
        res.json({authtoken: authtoken, signal: 'green'});
        

    }catch(e){
        console.log(error);
        res.status(500).json({error:"some error occured", signal: 'red'});
    }
}

module.exports = adminLogin;