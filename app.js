//jshint esversion:6
const express=require("express");
const app=express();
const  ejs=require("ejs");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const md5=require("md5")

mongoose.connect("mongodb://127.0.0.1:27017/user1DB")

const userschema=new mongoose.Schema({
   email:String,
   password:String,

})

const User=new mongoose.model("model",userschema)
app.use(express.static("public"))
app.set("view engine",'ejs');
app.use(
    bodyParser.urlencoded({
        extended:true
    })
)
app.get("/",function(req,res){
    res.render("home")
})

app.get("/register",function(req,res){
    res.render("register")
})
app.post("/register",(req,res)=>{
    
    

    
    const newuser=new User({
        email:req.body.username,
        password:md5(req.body.password)
    })
    newuser.save(function(err){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/",{stat})
        }
    })
})
app.post("/",(req,res)=>{
    
 
   console.log(username);
   const pass=md5(req.body.password) ;
   User.findOne({email:username},function(err,founduser){
    if(err){
        console.log(err)
    }
    else{
        console.log(founduser.password)
        console.log(pass)
        if(founduser){
            if(founduser.password===pass){
                res.render("secrets")
            }
            else{
                res.redirect("/")
            }
            
        
        }
        
    }
   })
})
app.listen(3000,()=>{
    console.log("app is listen");
})