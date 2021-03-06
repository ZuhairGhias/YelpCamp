var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");


router.get("/", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index.ejs", {campgrounds: allCampgrounds, currentUser: req.user});
        }
    });
    
});

// Edit Campground Route
router.get("/:id/edit", function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.render("campgrounds/edit.ejs", {campground: foundCampground});
        }
    })
    
});


// Update Campground Route
router.put("/:id", function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

router.post("/", isLoggedIn, function(req, res){
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description;
   var author = {
       id: req.user._id,
       username: req.user.username
   };
   var newCampground = {name: name, image:image, description:desc, author:author};
   
   Campground.create(newCampground, function(err, campground){
    if(err){
        console.log(err);
    }else{
        console.log("Created Campground: ");
        console.log(campground);
    }
});
   
   res.redirect("/campgrounds");
});

router.get("/new", isLoggedIn, function(req, res) {
   res.render("campgrounds/new.ejs"); 
});

router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, campground){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/show.ejs", {campground: campground});
        }
    });
});

// Authenitcate login
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;