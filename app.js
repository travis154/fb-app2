
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');
var FB = require('fb');
var fs = require('fs');
var arg = require('optimist').argv;

FB.api('oauth/access_token', {
	client_id: '364847430262752',
	client_secret: '4680b854a821ac600f3e90a4a5a99220',
	grant_type: 'email, user_about_me, user_birthday, user_location, publish_stream',
	redirect_uri:arg.redir
}, function (res) {
	if(!res || res.error) {
	   console.log(!res ? 'error occurred' : res.error);
	   return;
	}
	console.log(res);
	FB.setAccessToken(res.access_token);
	
	FB.api('me/photos', 'post', 
	{
		url:'http://instagr.am/p/PjPvqoFt8D/media/?size=l',
		message:'test',
	}
	, function(res){
		console.log(res);
	});
});

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/aa/aa', function(req,res){
	console.log(req);
});

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
