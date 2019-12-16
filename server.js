var port = process.env.PORT || 3000;
var express = require("express");
var ejs = require('ejs');
var request = require('request');
var url = require('url');
var app = express();

app.use(express.static('public'));
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/project");

var nameSchema = new mongoose.Schema({
 book: String,
 number: String
});

var User = mongoose.model("User", nameSchema);
 
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index');
})

app.post("/submit", function(req, res) {
 var myData = new User(req.body);
 myData.save()
 .then(item => {
 res.send("item saved to database");
 })
 .catch(err => {
 res.status(400).send("unable to save to database");
 });
});
 
app.listen(port, function() {
 console.log("Server listening on port " + port);
});
