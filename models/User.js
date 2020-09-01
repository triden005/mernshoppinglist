const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true
    },
    registerdate :{
        type : Date,
        default : Date.now

    },
});


module.exports = User = mongoose.model("user",UserSchema);
