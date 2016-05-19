// Require the Express Module
var express = require("express");
// Require path
var path = require("path");
// Require body-parser (to receive post data from clients)
var bodyParser = require("body-parser");

// Create an Express App
var app = express();
// Integrate body-parser with our App
app.use(bodyParser.urlencoded());

// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, "./static")));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');

require('./server/config/mongoose.js');
// This is how we connect to the mongodb database using mongoose -- "basic_mongoose" is the name of
//   our db in mongodb -- this should match the name of the db you are going to use for your project.
// mongoose.connect('mongodb://localhost/basic_rabbit');
// mongoose.connection.on('error', function(err){});


// var Bunny = mongoose.model('rabbit');

// Routes
// store the function in a variable
var routes_setter = require('./server/config/routes.js');
// invoke the function stored in routes_setter and pass it the "app" variable
routes_setter(app);

app.listen(8000, function() {
    console.log("listening on port 8000");
    console.log("Modular Mongoose Dashboard");
})
