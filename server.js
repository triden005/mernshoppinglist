const express =  require("express")
const mongoose = require ("mongoose")
const bodyparser = require("body-parser");
const config = require("config")

const items = require("./routes/api/items");
const users=require("./routes/api/users")
const auth = require("./routes/api/auth");

const app  = express();


/////Bodyparser Middle ware
app.use (bodyparser.json());

///Db config
const db=config.get("mondoURI");

mongoose
    .connect(db,{ useNewUrlParser: true, useUnifiedTopology: true  })
    .then(()=> console.log("db connected properly"))
    .catch(err => console.log(err));
//Use Routes
app.use("/api/items",items);

app.use ("/api/users",users);

app.use("/api/auth",auth);


const port = process.env.PORT || 5000;

app.listen(port ,()=> console.log(`server started at port ${port}`));
