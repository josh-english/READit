var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var Post = require("./models/post");
var port = 3000;

var app = express();
app.set('view engine', "ejs");
var mongoDB = 'mongodb://127.0.0.1/readit-db';
mongoose.connect(mongoDB, {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
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

// edit route
app.get("/posts/:id/edit", function(req, res){
	Post.findById(req.params.id, function(err, post){
		if(err){
			console.log(err);
		}
		else {
			res.render("posts/edit", {post: post});
		}
	});
});

// update route
app.put("/posts/:id", function(req, res){
	var post = {title: req.body.title};
	Post.findByIdAndUpdate(req.params.id, post, function(err, updatedPost){
		if(err){
			console.log(err);
		}
		else {
			res.redirect("/posts/" + req.params.id);
		}
	});
});

// destroy route
app.delete("/posts/:id", function(req, res){
	Post.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/posts");
		}
		else {
			res.redirect("/posts");
		}
	});
});

app.listen(port, function(){
	console.log("Express Server is running!");
});