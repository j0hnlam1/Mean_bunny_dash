var mongoose = require('mongoose');
var Bunny = mongoose.model('rabbit');
module.exports={
	show: function(req,res){
		Bunny.find({}, function(err, rabbit) {
	  		if(err){
	  			console.log('error');
	  		}
	  		else{
			   	res.render('index',{bunny: rabbit} );
	  		}
	    })
	},
	create: function(req,res){
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
	},
	edit: function(req,res){
		Bunny.findOne({_id: req.params.id}, function(err, rabbit){
		   	res.render('edit',{bunny:rabbit});
		})
	},
	remove: function(req,res){
	 	Bunny.remove({_id: req.params.id}, function(err, bunny) {
	 		console.log('sucessfully removed')
		   	res.redirect('/');
	    })
	}




}