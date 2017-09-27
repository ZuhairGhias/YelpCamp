var express = require("express");
var app = express();
var passport = require("passport");
var LocalStrategy = require("passport-local");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var User = require("./models/user");
var seedDB = require("./seeds");
var indexRoutes = require("./routes/index");
var campgroundRoutes = require("./routes/campgrounds");
var commentRoutes = require("./routes/comments");

console.log(process.env.DATABASEURL);

mongoose.connect(process.env.DATABASEURL);
//mongoose.connect("mongodb://ghiaszuh:ghiaszuh@ds155424.mlab.com:55424/yelpcamp");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+ "/public")); // Allows us to use scripts and css files in public


seedDB();

// Passport Configuration
app.use(require("express-session")({
    secret: "Dora the explorer",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Middleware that passes in info about the current user
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp server is running...");
});