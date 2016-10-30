var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/'));

app.get('/getStockData', function (req, res) {
  var stockDateJSON = JSON.parse(fs.readFileSync('./data/stock-data.json', 'utf8'));
  res.send(stockDateJSON);
});

app.post('/addStockItem', function(req, res) {
  var addDataObj = req.body.params;
  var JSONData = JSON.parse(fs.readFileSync('./data/stock-data.json', 'utf8'));

  // GET NEXT ID NUMBER
  var nextID = Math.max.apply(Math,JSONData.map(function(o){return o.id;}))
  addDataObj[0].id = ++nextID;

  addDataObj.map(function(item) {
    JSONData.push(item);
    console.log('==> JSONData', JSONData)
  });

  fs.writeFileSync('./data/stock-data.json', JSON.stringify(JSONData, null, 2), 'utf-8', function (err) {
    if (err) {
      console.error(err);
    }
  }); 
  var sendJSON = JSON.parse(fs.readFileSync('./data/stock-data.json', 'utf8'));

  res.send(sendJSON);
});

app.post('/updateItem', function(req, res) {
  var updateDataObj = req.body.params;
  var JSONData = JSON.parse(fs.readFileSync('./data/stock-data.json', 'utf8'));

  for(var key in JSONData) {
    if(JSONData[key].id === updateDataObj[0].id) {
      console.log()
      JSONData[key].available_date.month = updateDataObj[0].available_date.month;
      JSONData[key].available_date.day = updateDataObj[0].available_date.day;
      JSONData[key].available_date.year = updateDataObj[0].available_date.year;
    }
  }

  fs.writeFileSync('./data/stock-data.json', JSON.stringify(JSONData, null, 2), 'utf-8', function (err) {
    if (err) {
      console.error(err);
    }
  });

  res.send('SUCCESS');
});


app.use(express.static(__dirname + '/../client/'));
app.get('/*', function (req, res){
  res.sendFile(__dirname + '/index.html');
})

var port = process.env.PORT || 4000;

app.listen(port, function(error){
  if(error) throw error;
  console.log('Express server listening on port', port);
});
