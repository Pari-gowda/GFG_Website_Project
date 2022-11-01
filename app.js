const express = require('express');
const mongoose = require('mongoose');
const { toUSVString } = require('util');


const app = express();

mongoose.connect("mongodb://localhost/qooh", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(express.urlencoded({extended: true}))
app.use(express.static("public"));
app.set("view engine","ejs");


app.use(require("./routes/index"));

app.listen(3000,()=> console.log("Server is listening on port 3000"));