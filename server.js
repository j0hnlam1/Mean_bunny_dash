// Require the Express Module
var express = require("express");
// Require path
var path = require("path");
// Require body-parser (to receive post data from clients)
var bodyParser = require("body-parser");
//require mongoose
var mongoose = require('mongoose');
// Create an Express App
var app = express();
// Integrate body-parser with our App
app.use(bodyParser.urlencoded());

// Setting our Static Folder Directory
app.use(express.static(__dirname + "./static"));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');

// This is how we connect to the mongodb database using mongoose -- "basic_mongoose" is the name of
//   our db in mongodb -- this should match the name of the db you are going to use for your project.
mongoose.connect('mongodb://localhost/basic_rabbit');
mongoose.connection.on('error', function(err){});

var bunnySchema = new mongoose.Schema({
    name: String,
    color: String,
    weight: Number,
    quote: String,
    created_at: { type: Date, default: Date.now },
})

// //validations
// bunnySchema.path('name').required(true, 'name must not be empty');
// bunnySchema.path('bunny').required(true, 'quote must not be empty');

mongoose.model('rabbit', bunnySchema);
var Bunny = mongoose.model('rabbit');


// Routes
// route to main
app.get('/', function(req, res) {
  	Bunny.find({}, function(err, rabbit) {
  		if(err){
  			console.log('error');
  		}
  		else{
		   	res.render('index',{bunny: rabbit} );
  		}
    })
})	
// route to add
app.get('/addabunny', function(req, res) {
   	res.render('add');
})

// route to edit
app.get('/edit/:id', function(req, res) {
	Bunny.findOne({_id: req.params.id}, function(err, rabbit){
	   	res.render('edit',{bunny:rabbit});
	})
})

// route to remove
app.get('/remove/:id', function(req, res) {
  	  Bunny.remove({_id: req.params.id}, function(err, bunny) {
	   	res.redirect('/');
    })
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
	var bunny = new Bunny({
		name: req.body.name, 
		color: req.body.color, 
		weight: req.body.weight,
		quote: req.body.quote
	});
	
	bunny.save(function(err) {
	    if(err) {
    		console.log('something went wrong');
		    res.redirect('/');
	    }
		    else { 
		    	console.log('sucessfully added');
		    	res.redirect('/');
		    }
  	})
})
app.listen(8000, function() {
    console.log("listening on port 8000");
    console.log("Mongoose Dashboard");
})
