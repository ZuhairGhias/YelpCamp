var express = require("express");
var passport = require("passport");
var router = express.Router();
var User = require("../models/user");



router.get("/", function(req, res){
    res.render("landing.ejs");
});

//=============
// Authentification routes
//=============

// Show register forms
router.get("/register", function(req, res){
    res.render("register.ejs");
});

// Handle signup logic
router.post("/register", function(req, res){
    var newUser =new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
       if(err){
           console.log(err);
           return res.redirect("/register");
       }
       passport.authenticate("local")(req, res, function(){
           res.redirect("/campgrounds");
       });
    });
});

// Show login form
router.get("/login", function(req, res){
    res.render("login.ejs");
});

// Handle signup logic
router.post("/login", passport.authenticate( "local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res){
    
});

// handle logout logic
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/campgrounds");
});

module.exports = router;