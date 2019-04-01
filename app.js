var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Post = require("./models/post");
var port = 3000;

var app = express();
app.set('view engine', "ejs");
var mongoDB = 'mongodb://127.0.0.1/readit-db';
mongoose.connect(mongoDB, {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

var seed = require("./seed");
seed();

// root route
app.get("/", function(req, res){
	res.render("landing");
});

// index route
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

// create route
app.post("/posts", function(req, res){
	var newPost = {title: req.body.title};
	Post.create(newPost, function(err, newP){
		if(err){
			console.log(err);
		}
		else {
			res.redirect("/posts");
		}
	});
});

// new route
app.get("/posts/new", function(req, res){
	res.render("posts/new");
});

// show route
app.get("/posts/:id", function(req, res){
	Post.findById(req.params.id, function(err, post){
		if(err){
			console.log(err);
		}
		else {
			res.render("posts/show", {post: post});
		}
	});
});

app.listen(port, function(){
	console.log("Express Server is running!");
});