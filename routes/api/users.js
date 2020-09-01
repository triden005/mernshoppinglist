
const express = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt=require("jsonwebtoken");

const router = express.Router();


///db item models
const User = require("../../models/User");

// @route GET api/items
// @desc GET All Items
// @access Public
router.get("/",(req,res)=>{
    // res.send("register");
    User.find()
        .sort({registerdate:-1})
        .then(items => res.json(items));
})

// @route POST api/items
// @desc create an item
// @access Public
router.post("/",(req,res)=>{
    // console.log(req.body);
    const {name ,email,password}=req.body;
    if(!name || !email || !password) return res.json(400,{msg: "please enter fields"});

    //check for exisitng user
    User.findOne({email})
        .then(user=>{
            if(user) return res.status(402).json({msg:"user already exists"})

            const newuser = new User({
                name,
                email,
                password
            });
            //hashing password using bcryptjs
            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(newuser.password,salt,(err,hash)=>{
                    if(err) throw err;
                    newuser.password = hash;

                    newuser.save()
                            .then(dbrep =>{
                                jwt.sign(
                                    {id :dbrep._id,name:dbrep.name,email:dbrep.email},
                                    config.get("jwtSecret"),
                                    {expiresIn:3600},
                                    (err,token)=>{
                                        if(err) throw err;
                                        res.json({
                                            token,user:{id:dbrep._id,name:dbrep.name,email:dbrep.email}
                                        })
                                    })
                                    
                            });

                })
            })
            //
            

        });


})
// // @route DELETE api/items
// // @desc delete a post
// // @access Public
// router.delete("/:id",(req,res)=>{
//     // console.log(req.body);
//     Item.findById(req.params.id)
//     .then(item => item.remove().then(()=>res.json({success:true})))
//     .catch(err => res.status(400).json({ success:false }));
// })

module.exports = router;