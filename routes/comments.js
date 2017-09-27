var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");



//==============
//COMMENT ROUTES
//==============


router.get("/new", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new.ejs", {campground: campground});
        }
    });
});

router.post("/", isLoggedIn, function(req, res){
   
   Comment.create(req.body.comment, function(err, comment){
        if(err){
            console.log(err);
        }else{
            Campground.findById(req.params.id, function(err, campground){
                if(err){
                    console.log(err);
                }else{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    console.log("Created Comment: ");
                    console.log(comment);                 
                }
            });
        }
    
    });
    res.redirect("/campgrounds/" + req.params.id);
});

// Authenitcate login
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;