var express = require("express");
var app = express();
var mongoose  = require("mongoose");
var User = require("./models/user")
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose  = require("passport-local-mongoose");
var bodyParser = require('body-parser');
var rellax = require("rellax"); 
var flash = require("connect-flash"); 

//mongodb://localhost/cxamplified
mongoose.connect("mongodb+srv://dhaval:Welcome30@cluster0-71yob.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true } ,  function (err){
    if (err)
    console.log("error changed  connecting to database  ", err);
    else
    console.log("Database connected !!! ")

});
app.use(express.static('public'))
app.use(flash()); 
app.use(require("express-session")({secret: "Dhaval is awesome", resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'ejs');
app.use(function(req, res, next){
    res.locals.currentUser= req.user;
    res.locals.error=req.flash("error"); 
    res.locals.success=req.flash("success"); 
    
    next();
})

//=====================
//      ROUTES
//=====================

app.get('/register', function(req, res){

    res.render("register");

})

app.post('/register', function(req, res){
    console.log(req.body.username + "/" + req.body.password);
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log("error registering the user: " + err);
            return res.render('./register');
        }
        else {
            passport.authenticate("local")(req, res, function(){
                res.redirect('/');

            })
        }

    })

})

app.get('/login', function(req, res){

    res.render("login");

})

app.post("/login", passport.authenticate("local", {
        successRedirect:"/",
        failureRedirect:"/login"
    }), function(req, res){
        
           }
        );

app.get("/logout", function (req,res){
    req.logout();
    req.flash("success", "Logged you out!!")
    res.redirect("/");
})

function isLoggedIn(req, res, next ){
    if(req.isAuthenticated()){
        return next();
    }
    console.log("Not logged in")
    req.flash("error", "You are not logged in !!!")
    res.redirect("/login");

}
app.get('/', function (req, res){

    res.render('home');

});

app.get('/detail', isLoggedIn,   function (req, res)
{
    res.render('detail');

})

app.listen(process.env.PORT || 3000, function (err){
    console.log('server started on port 3000');

})
