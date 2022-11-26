const express = require("express");
const bodyParser = require("body-parser");
const { application } = require("express");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");

console.log(date.getDay());

const app = express();
var items = ["Drop your questions here !",];
var answers = ["Answers are available here!",]

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/qoohDB", {useNewUrlParser: true});

const itemSchema = {
    question: String
};

const hat = mongoose.model("qooh",itemSchema);

const hat1 = new hat({
    question: "What is GFG ?"
});

const hat2 = new hat({
    question: "What is SIT ?"
});

const hat3 = new hat({
    question: "What is peace ?"
});

const defaultItems = [hat1,hat2,hat3];

const solSchema = new mongoose.Schema({
    question: String,
    answer: [String],
})
   


const solution = mongoose.model("Solution",solSchema);



app.get("/",(req,res)=>{
    hat.find({}, function(err,response){
        if(response.length===0)
        {
            hat.insertMany(defaultItems,function(err){
                if(err){
                    console.log(err);
                }else{
                    console.log("Successfully saved to DB yeah!");
                }
            });
            res.redirect("/");
        }else
        res.render("list", {listItem: "qooh", newKart: response});
    });
    
});

app.post("/",(req,res)=>{

    const hat4 = new hat({
        question: req.body.newItem,
    })
    if(req.body.list==="answer")
    {
        answers.push(hat4);
        res.redirect("/answers");
    }else if(req.body.list==="qooh"){ 
        hat4.save(function(err,result){
            if(err)
                console.log(err);
            else
                console.log("Question Inserted!");
        })
        res.redirect("/");
    }
    
})

app.post("/delete", function(req,res){
    const checkedId = req.body.delete;
    hat.findByIdAndRemove(checkedId, function(err){
        if(err)
        console.log(err);
        else
            console.log("Item " + checkedId + " Removed");
    })
    res.redirect("/");
})

app.get("/solution",(req,res)=>{
    
})

app.post("/solution",(req,res)=>{
    const quest = req.body.sol; 
    const ans = req.body.solutionbox;
     solution.findOne({question: quest},function(err,result){
        console.log(result.answer);
        if(result)
        res.render("solution", {theQuestion: quest,theAnswer: result.answer});
     });
    
    // });
    // const sol1 = new solution({
    //     question: quest,
    //     answer: ["Geeks for Geeks"," GFG SIT"],
    // });
    // sol1.save();
    
    solution.findOneAndUpdate({question: quest},{$push: {answer: "Brinjal"} 
    });
    
});


app.listen(3100,()=>{
    console.log("server started on port 3100");
});