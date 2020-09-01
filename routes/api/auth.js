const express = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt=require("jsonwebtoken");
const auth = require("../../middleware/auth")

const router = express.Router();


///db item models
const User = require("../../models/User");
const { route } = require("./items");

// @route GET api/items
// @desc GET All Items
// @access Public
router.get("/",(req,res)=>{
    res.send("register");
    User.find()
        .sort({registerdate:-1})
        .then(items => res.json(items));
})

// @route POST api/items
// @desc create an item
// @access Public
router.post("/",(req,res)=>{
    // console.log(req.body);
    const {email,password}=req.body;
    if(!email || !password) res.json(400,{msg: "please enter fields"});

    //check for exisitng user
    User.findOne({email})
        .then(user=>{
            if(!user) return res.status(400).json({msg:"user doesnot exists"})

            //hashing password using bcryptjs for validation
            bcrypt.compare(password,user.password)
                .then(boolisMatch =>{
                    if(!boolisMatch) return res.json(400,{msg:"password incorrect"})
                    jwt.sign(
                        {id :user._id,name:user.name,email:user.email},
                        config.get("jwtSecret"),
                        {expiresIn:3600},
                        (err,token)=>{
                            if(err) throw err;
                            res.json({
                                token,user:{id:user._id,name:user.name,email:user.email}
                            })
                        })

                })
            
            //
            

        });


})

//route GET api/auth/user
//desc  get user data
//access Private
router.get("/user",auth,(req,res)=>{
    User.findById(req.user.id)
        .select('-password')
        .then(user =>res.json({user}))
})


module.exports = router;