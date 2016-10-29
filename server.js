var express = require('express');
var app = express();
// var request = require('request');
var bodyParser = require('body-parser');
var fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/')); 

app.get('/getStock', function (req, res) {
  var obj = JSON.parse(fs.readFileSync('./data/stock.js', 'utf8'));
  console.log('======> ', obj);
  var obj2 = [
  {
    "name": "Item Name 1"
  },
  {
    "name": "Item Name 2"
  },
  {
    "name": "Item Name 3"
  }
];
  res.send(obj);
});

app.get('/*', function (req, res){
  res.sendFile(__dirname + '/index.html');
})


// ====
// app.get('/getStock', function(req, res) {
//   // response.send(response.data);
//   // var obj = JSON.parse(fs.readFileSync('./data/stock.js', 'utf8'));
//   // response.send(obj);
//   console.log('/getStock')
//   res.send('HERE YOU GO');
// });





var port = process.env.PORT || 4000;

app.listen(port, function(error){
  if(error) throw error;
  console.log('Express server listening on port', port);
});



