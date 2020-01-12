var express = require("express"); 
var app = express(); 
var mongoose  = require("mongoose"); 
var user = require("./models/user")
var passport = require("passport"); 
var LocalStrategy = require("passport-local"); 
var passportLocalMongoose  = require("passport-local-mongoose"); 

mongoose.connect("mongodb://localhost/cxamplified", { useNewUrlParser: true, useUnifiedTopology: true } ,  function (err){
    if (err)
    console.log("error connecting to database  ", err); 
    else 
    console.log("Database connected !!! ")

}); 
app.set('view engine', 'ejs'); 

app.get('/', function (req, res){

    res.render('home'); 

}); 

app.get('/detail', function (req, res) 
{
    res.render('detail'); 

})

app.listen(3000, function (err){
    console.log('server started on port 3000'); 

})