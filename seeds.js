var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var loremIpsum="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

var data=[
    {
        name:"This women has a phone!",
        image:"https://images.pexels.com/photos/396134/pexels-photo-396134.jpeg?w=940&h=650&auto=compress&cs=tinysrgb",
        description: loremIpsum
    },
    {
        name:"This is a stadium",
        image:"https://images.pexels.com/photos/396300/pexels-photo-396300.jpeg?w=940&h=650&auto=compress&cs=tinysrgb",
        description: loremIpsum
    },
    {
        name:"This looks tasty",
        image:"https://images.pexels.com/photos/573673/pexels-photo-573673.jpeg?w=940&h=650&auto=compress&cs=tinysrgb",
        description: loremIpsum
    }
];

function seedDB(){
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }else{
            console.log("Cleared DB");
            
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    }else{
                        console.log("Added a campground");
                        Comment.create(
                            {
                                text:"First!!!",
                                author:"TheLegend27"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                }else{
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created comment")
                                }
                            }
                        );
                    }
                });
            });
            
        }
    });
}

module.exports = seedDB;