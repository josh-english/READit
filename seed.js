// seeds mongo db with post information
var Post = require("./models/post");

var posts = [
	{
		title: "'Time to Act': Nationwide Protests Planned If Barr Fails to Release Full Mueller Report By Tonight - 'Barr has offered an alternate timeline for a redacted version of the report—but we deserve the full report and congressional leaders and the American people expect it now.'",
		subreadit: "politics",
		link: "https://www.commondreams.org/news/2019/04/02/time-act-nationwide-protests-planned-if-barr-fails-release-full-mueller-report",
		image: "https://www.commondreams.org/sites/default/files/styles/cd_large/public/headlines/mueller_report.jpg?itok=s470WkBp",
		author: {
			id: "588c2e092403d111454fff76",
			username: "Hoxha_Posadist"
		}
	},
	{
		title: "The Impact of a Teacher",
		subreadit: "wholesomememes",
		link: "",
		image: "https://i.redd.it/hsruftbvctp21.jpg",
		author: {
			id: "588c2e092403d111454fff71",
			username: "sari13371"
		}
	}
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
