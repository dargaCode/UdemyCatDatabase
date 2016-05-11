
'use strict'; // so let will work

// DEPENDENCIES

const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// SETTINGS

app.set('view engine', 'ejs');
ejs.delimiter = '?';
mongoose.connect('mongodb://localhost/cat_app');
app.use(bodyParser.urlencoded({
  extended: true
}));

// CONSTANTS

const PORT_NUM = 3000;
const SERVER_MSG = 'Cat App server is now listening on port ' + PORT_NUM;

const catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  breed: String,
  color: String
});

const Cat = mongoose.model('Cat', catSchema);

// SERVER

app.listen(process.env.PORT || 3000, function() {
  console.log(SERVER_MSG);
});

// ROUTES

app.get('/', function(request, response) {

  Cat.find({}, function(error, dbSearchResults) {
    if (error) {
      console.log('Error when finding items! \n');
      console.log(error);
      request.send(error);
    } else {
      console.log('All items successfully found! \n');
      console.log(dbSearchResults);

      response.render('cats', {
        dbCatList: dbSearchResults
      });
    }
  });

});

app.post('/addNewCat', function(request, response) {
  const newCatName = request.body.catName;
  const newCatAge = request.body.catAge;
  const newCatBreed = request.body.catBreed;
  const newCatColor = request.body.catColor;

  const newCat = {
    name: newCatName,
    age: newCatAge,
    breed: newCatBreed,
    color: newCatColor,
  };

  Cat.create(newCat, function(error, createdCat) {
    if (error) {
      console.log('DB addition failed!');
      console.log(error);
      response.send(error);
    } else {
      console.log('Cat successfully added!');
      console.log(createdCat);

      response.redirect('/');
    }
  });

});
