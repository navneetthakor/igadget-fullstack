// to use router provided by express.js module
const express = require("express");
const router = express.Router();

// to validate the parameters provided by the user
const { body, validationResult } = require("express-validator");

// to get connectivity with collection of product in backend using mongooes
const Product = require("../model/Product");

//for admin authentication
const Admin = require("../model/Admin");

// to upload images
const upload = require("../middleware/fetchImages");

// importing fetchAdmin middleware
// will use it in '/getAdmin' end point
const fetchAdmin = require("../middleware/fetchAdmin");
const { sign } = require("jsonwebtoken");
const { model } = require("mongoose");

// -------------------------ROUTE:1 to add product -------------------------------------
router.post(
  "/addprod",
  upload.array("images"),
  fetchAdmin,
  [
    body("title", "please enter tiltle with min length of : 6").isLength({min: 6}),
    body("description", "please enter valid descretion format").not().isEmpty(),
    body("category", "please enter valid descretion format").not().isEmpty(),
    body("price", "please enter valid price.").isNumeric(),
  ],
  async (req, res) => {
    try {
      // first of all check whether this request is made by admin or not
      // fetching the id provided by fetchAdmin middleware
      const adminId = req.admin.id;

      // gethering the details of admin with provided id
      const admin = await Admin.findById(adminId);
      if (!admin) {
        return res
          .status(401)
          .json({ error: "Authentication fail please login", signal: "red" });
      }

      // check the validation for given parameters in body
      const err = validationResult(req);
      if (!err.isEmpty()) {
        return res.status(400).json({ error: err.array(), signal: "red" });
      }

      let temp;
      // Check if files were uploaded
      if (req.files && req.files.length > 0) {
        const imagePaths = req.files.map((file) => file.path);

         temp = new Product({
          images: imagePaths,
          title: req.body.title,
          description: req.body.description,
          company: req.body.company,
          model: req.body.model,
          height: req.body.height,
          width: req.body.width,
          dummyPrice: req.body.dummyPrice,
          price: req.body.price,
          totrating: req.body.totrating,
          prodname: req.body.prodname
        });
      }
      temp.save();
      return res.json({ product: temp, signal: "green" });
    } catch (e) {
      res.status(500).json({ email: "Internal server error", signal: "red" });
    }
  }
);

// -------------------------ROUTE:2 to delete product -------------------------------------
router.delete("/deleteprod/:id", fetchAdmin, async (req, res) => {
  try {
    // first of all check whether this request is made by admin or not
    // fetching the id provided by fetchAdmin middleware
    const adminId = req.admin.id;

    // gethering the details of admin with provided id
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res
        .status(401)
        .json({ error: "Authentication fail please login", signal: "red" });
    }

    //finding product with provided id
    const prod = Product.findById(req.params.id);
    if (!prod) {
      return res
        .status(400)
        .json({ error: "product with provided id not exist.", signal: "red" });
    }

    // admin autheticated and product exist in backend
    // so all safe now delete the product
    await Product.findByIdAndDelete(req.params.id);
    return res.json({ signal: "green" });
  } catch (error) {
    res.status(500).json({ email: "Internal server error", signal: "red" });
  }
});

// -------------------------ROUTE:3 to update product -------------------------------------
router.put("/updateprod/:id", fetchAdmin, async (req, res) => {
  try {
    // first of all check whether this request is made by admin or not
    // fetching the id provided by fetchAdmin middleware
    const adminId = req.admin.id;

    // gethering the details of admin with provided id
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res
        .status(401)
        .json({ error: "Authentication fail please login", signal: "red" });
    }

    // creating a temporory product to store parameters provided in request
    const { title, description, dummyPrice, price, category, company, model, width, height } =
      req.body;
    const prod = {};

    if (title) {
      prod.title = title;
    }
    if (description) {
      prod.description = description;
    }
    if (dummyPrice) {
      prod.dummyPrice = dummyPrice;
    }
    if (price) {
      prod.price = price;
    }
    if (category) {
      prod.category = totrating;
    }
    if (company) {
      prod.company = company;
    }
    if (model) {
      prod.model = model;
    }
    if (width) {
      prod.width = width;
    }
    if (height) {
      prod.height = height;
    }

    // find product to be update
    const findProd = Product.findById(req.params.id);
    if (!findProd) {
      return res
        .status(400)
        .json({ error: "product not exist", signal: "red" });
    }

    // now all safe to update the product
    const updatProd = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: prod },
      { new: true }
    );
    res.json({ product: updatProd, signal: "green" });
  } catch (error) {
    res.status(500).json({ email: "Internal server error", signal: "red" });
  }
});

// -----------------------ROUT:4 fetch all the products -----------------.
router.post('/fetchallprods', async (req,res)=>{
    try {
    const prods = await Product.find();

    res.json(prods)
    } catch (error) {
    console.log(error);
    res.status(500).send("some error occured");
    }
})


// ------------------------ROUT:5 fetch limited data----------------------
router.post('/fetchlimitprods',
async(req,res)=>{

  try{
    // this are the parameters that will be provided in req
    const {page=1, pageSize=6, prodname='watch'} = req.query;
    const skip = (page-1)*pageSize;

    const prods = await Product.find({prodname:prodname})
    .skip(skip) //to skip the data that already fetched
    .limit(pageSize) // to send limited data
    .exec();

    res.json(prods);

  }
  catch(e){
    console.log(e);
    res.status(500).send("some error occured");
  }
})


// ----------------------ROUT:6 fetch all but pertucal named products----------------
router.post('/fetchnamedprods', 
async (req,res)=>{

  try {
    const {prodname= 'laptop'} = req.query;

    const prods = await Product.find({prodname: prodname})
    // console.log(prods);

    res.json(prods);
  } catch (e) {
    console.log(e);
    res.status(500).send("some error occured");
  }

})

module.exports = router;
