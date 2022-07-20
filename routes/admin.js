let express = require("express");
let bodyparser = require("body-parser");
let User = require("../models/User");
let Order = require("../models/Order");
let router = express.Router();


router.post("/login", async(req, res)=>{
    let body = req.body;
    let status = "";
    if(body.data.username == "admin" && body.data.password == "admin")
        status = "success";
    else
        status = "failed";
    let data = {data:{status:status}};
    res.end(JSON.stringify(data));
});

router.post("/users", async(req, res)=>{
    try{
        let users = await User.find();
        res.end(JSON.stringify({status:"success", data:users}));
    }
    catch{
        res.end(JSON.stringify({status:"failed", data:"Something went wrong"}));
    }
});


router.post("/orders", async(req, res)=>{
    try{
        let body = req.body;
        if(body.data.userid == ""){
            let orders = await Order.find();
            res.end(JSON.stringify({status:"success", data:orders}));            
        }
        else{
            let orders = await Order.find({userid:body.data.userid});
            res.end(JSON.stringify({status:"success", data:orders}));        
        }
    }
    catch{
        res.end(JSON.stringify({status:"failed", data:"Something went wrong"}));        
    }
});

module.exports = router;