const express = require("express");
const router = express.Router();


///db item models
const Item = require("../../models/Item");

// @route GET api/items
// @desc GET All Items
// @access Public
router.get("/",(req,res)=>{
    Item.find()
        .sort({date:-1})
        .then(items => res.json(items));
})

// @route POST api/items
// @desc create an item
// @access Public
router.post("/",(req,res)=>{
    // console.log(req.body);
    const newitem = new Item({
        name :req.body.name
    });

    newitem
        .save()
        .then(dbrep =>res.json(dbrep));
})
// @route DELETE api/items
// @desc delete a post
// @access Public
router.delete("/:id",(req,res)=>{
    // console.log(req.body);
    Item.findById(req.params.id)
    .then(item => item.remove().then(()=>res.json({success:true})))
    .catch(err => res.status(400).json({ success:false }));
})

module.exports = router;