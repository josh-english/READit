var mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
	title: String,
	subreadit: String,
	link: String,
	image: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	}
});

var Post = mongoose.model("Post", postSchema);

module.exports = Post;