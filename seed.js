// seeds mongo db with post information
var Post = require("./models/post");

var posts = [
	{title: "This is a post"},
	{title: "This is a second post"}
];

function seed(){
	Post.deleteMany({}, function(err){
		if(err){
			console.log(err);
		}
		console.log("Deleted all posts!");
		posts.forEach(function(post){
			Post.create(post, function(err, newPost){
				if(err){
					console.log(err);
				}
				else {
					console.log("Added post.")
				}
			});
		});
	});
}

module.exports = seed;
