var express = require('express'); // expressjs is the nodejs web server
var path = require('path'); // path is part of nodejs - helps get file/directory paths
var favicon = require('static-favicon'); // serves a favicon - expressjs uses this
var cookieParser = require('cookie-parser'); // 
var bodyParser = require('body-parser');

var app = express(); // create an expressjs app

//  templates directory to 'views'
app.set('views', __dirname + '/views');

// setup ExpressJS template engine 
app.set('view engine', 'html'); // our html templates will have the .html extension
app.set('layout', 'layout'); // a main header / footer layout will be used called layout
app.engine('html', require('hogan-express')); // we render our templates with Hogan

app.use(favicon()); 
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function (request, response) {

	response.send('<p>Hi Jenny!</p><p><a href="/page2">Click here to see page 2.</a>');

});

app.get('/page2', function (req, res) {

	var templateData = {
		title: 'This is a template example',
		
		address: {
			street: '123 8th ave',
			apt: '21',
			city: 'New York',
			state: 'NY',
			zipcode: 10018
		},
		
		colors: ['red','blue','green','purple','magenta'],
		
		animals: [
			{
				type: 'guinea pig',
				name: 'Cinnamon',
				image_url: 'http://dora.missouri.edu/wp-content/uploads/2012/11/guinea-pig-tan.jpg'
			},

			{
				type: 'dog',
				name: 'Sheldon',
				image_url: '/img/sheldon.jpg'
			}
		]
	};

	res.render('index.html', templateData); // all the html for the display is in views/index.html and views/layout.html

});


app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
