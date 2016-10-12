var express = require('express');
var stormpath = require('express-stormpath');
var app = express();
 
app.use(stormpath.init(app, {
  application:process.env.STORMPATH_URL,

  // expand: {
  //   customData: true,
  // },
  // web: {
  //   produces: ['application/json']
  // }
}));

// GET 
app.get('/', function(req, res) {
  res.send("Hey there!")
});


app.get('/calculate', function(req, res){
	var spawn = require('child_process').spawn,
    py    = spawn('python', ['compute_input.py']),
    data = [1,2,3,4,5,6,7,8,9],
    dataString = '';

	py.stdout.on('data', function(data){
	  dataString += data.toString();
	});
	py.stdout.on('end', function(){
	  console.log('Sum of numbers=',dataString);
	  res.send(dataString);
	});
	py.stdin.write(JSON.stringify(data));
	py.stdin.end();
});


// // GET note API call
// app.get('/notes', stormpath.apiAuthenticationRequired, function(req, res) {
//   res.json({notes: req.user.customData.notes || "This is your notebook. Edit this to start saving your notes!"})
// });
 

// // POST note API call
// var bodyParser = require('body-parser');
 
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));
 
// app.post('/notes', stormpath.apiAuthenticationRequired, function(req, res) {
//   if(!req.body.notes || typeof req.body.notes != "string") {
//     res.status(400).send("400 Bad Request");
//   }
 
//   req.user.customData.notes = req.body.notes;
//   req.user.customData.save();
//   res.status(200).end();
// }) ;


app.listen(process.env.PORT || 3000); // port number