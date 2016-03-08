var express = require('express');
var router = express.Router();
var _ = require('underscore');

var mongoose = require('mongoose');
//create a schema for articles
var Article = mongoose.model('Article');

// note that typically data would NOT be loaded from the filesystem in this manner :)

router.get('/articles', function(req, res, next) {

	res.header('Access-Control-Allow-Origin','*');
	res.header('Access-Control-Allow-Headers','X-Requested-With');

	Article.find({},null,{sort:{date: -1}}, function(err,data){
	// Article.find( function(err,data){

		res.json(data);
	});



	// var fs = require('fs');
	// var obj;
	// fs.readFile('./data/articles.json', 'utf8', function (err, data) {
	//   if (err) throw err;
	//   res.json(JSON.parse(data));
	// });
});

router.get('/articles/:id', function(req, res, next) {
	res.header('Access-Control-Allow-Origin','*');
	res.header('Access-Control-Allow-Headers','X-Requested-With');

		console.log("req.params.id:"+req.params._id);

	Article.findById(req.params._id, function(err,article){
		if(!err){
			res.render('detail',{data:article});
		}else{
			res.send(404,'File not found!??????');
		}
	})

	// var fs = require('fs');
	// var obj;
	// fs.readFile('./data/articles.json', 'utf8', function (err, data) {
	// 	if (err) throw err;

	// 	data = _.filter(JSON.parse(data), function(item) {
	// 	    return item.id == req.params.id;
	// 	});

	// 	res.json(data);
	// });
});

module.exports = router;