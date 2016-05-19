var mongoose = require('mongoose');
var Bunny = mongoose.model('rabbit');
var bunnies = require('../controllers/bunnies.js');

module.exports=function(app){
	// route to main
	app.get('/', function(req, res) {
	  	bunnies.show(req,res);
	})	
	// route to add
	app.get('/addabunny', function(req, res) {
	   	res.render('add');
	})

	// route to edit
	app.get('/edit/:id', function(req, res) {
		bunnies.edit(req,res);
	})

	// route to remove
	app.get('/remove/:id', function(req, res) {
		bunnies.remove(req,res);
	})

	// subit edit form
	app.post('/submit/:id', function(req, res) {
	  	  Bunny.update({_id: req.params.id}, req.body ,function(err, rabbit) {
		   	res.redirect('/');
	    })
	})

	// route to add bunny
	app.post('/bunnyform', function(req, res) {
		console.log('Post data', req.body);
		bunnies.create(req,res);
	})
}