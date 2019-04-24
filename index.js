var express = require("express");
var bodyParser = require("body-parser"); 
var app = express();
var MongoClient = require("mongodb").MongoClient;
var db;

MongoClient.connect('mongodb+srv://rosie:<6badassladydevs%21>@rivtr-ri014.mongodb.net/test?retryWrites=true', { useNewUrlParser: true }, (err, client) => {
  if (err) {
    return console.log(err);
  }
  db = client.db('rivtr'); // whatever your database name is
  app.listen(3000, () => {
    console.log('listening on 3000');
  });
});

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/users', (req, res) => {
  console.log(req.body);
});

app.post('/users', (req, res) => {
  db.collection('users').save(req.body, (err, result) => {
    if (err) {
      return console.log(err);
    }

    console.log('saved to database');
    res.redirect('/');
  });
});