var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var http = require('http');
var rp = require('request-promise');
var credentials = require('./keys.json');


//connect to Mongoose
mongoose.connect('mongodb://127.0.0.1/simple');
var db = mongoose.connection;

app.use(express.static(__dirname + '/view'));
//Store all HTML files in view folder.
app.use(express.static(__dirname + '/script'));
//Store all JS and CSS in Scripts folder.

//hardcoded for test
var user = "x00066949";

var result = "";

//to show in browser
//set route for homepage 
app.get('/',function(request,response){
	rp({
		uri: 'https://api.github.com/users/'+user,
		
		headers: {
			'User-Agent': 'simple_rest_app'
		},
		qs: {
		//  q: user,
		  client_id: credentials.GIT_CLIENT_ID,
		  client_secret : credentials.GIT_CLIENT_SECRET
		},
		json: true
	  })
		.then((data) => {
		  //response.send(data)
		  response.render('/index.html')
		})
		.catch((err) => {
		  console.log(err)
		  response.render('error')
    })
	
	
});

app.post('/hello', function(req,res,next){
	var userName = req.body.displayName;
	var botMessage = {
		text:'Hi '+ UserName +' weclcome to the space.'
	};

});

//set listening port
app.listen(9000);
console.log('running on port 9000...');
