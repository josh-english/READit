var express = require("express");
var mongoose = require("mongoose");
var Post = require("./models/post");
var port = 3000;

var app = express();
app.set('view engine', "ejs");
var mongoDB = 'mongodb://127.0.0.1/readit-db';
mongoose.connect(mongoDB, {useNewUrlParser: true});
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/assets"));

var seed = require("./seed");
seed();

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/posts", function(req, res){
	Post.find({}, function(err, posts){
		if(err) {
			console.log(err);
		}
		else {
			res.render("posts/index", {posts: posts});
		}
	});
});



app.listen(port, function(){
	console.log("Express Server is running!");
});