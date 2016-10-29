var express = require('express');
var app = express();
// var request = require('request');
var bodyParser = require('body-parser');
var fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/')); 

app.get('/getStock', function (req, res) {
  var obj = JSON.parse(fs.readFileSync('./data/stock.json', 'utf8'));
  // console.log('======> ', obj);
  res.send(obj);
});

app.post('/addStockItem', function(req, res) {
  var obj = req.body.params;
  console.log('obj', obj)
  var JSONData = JSON.parse(fs.readFileSync('./data/stock.json', 'utf8'));

  // GET NEXT ID NUMBER
  var nextID = Math.max.apply(Math,JSONData.map(function(o){return o.id;}))
  obj[0].id = ++nextID;

  obj.map(function(item) {
    JSONData.push(item);
    console.log('==> JSONData', JSONData)
  });

  fs.writeFileSync('./data/stock.json', JSON.stringify(JSONData), 'utf-8', function (err) {
    if (err) {
      console.error('Crap happens');
    }
  }); 
  var new_obj = JSON.parse(fs.readFileSync('./data/stock.json', 'utf8'));

  res.send(new_obj);
});

app.get('/*', function (req, res){
  res.sendFile(__dirname + '/index.html');
})

var port = process.env.PORT || 4000;

app.listen(port, function(error){
  if(error) throw error;
  console.log('Express server listening on port', port);
});
