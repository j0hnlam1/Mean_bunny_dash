// require mongoose
var mongoose = require('mongoose');
// create the schema
var bunnySchema = new mongoose.Schema({
    name: String,
    color: String,
    weight: Number,
    quote: String,
    created_at: { type: Date, default: Date.now },
})
// register the schema as a model
mongoose.model('rabbit', bunnySchema);
