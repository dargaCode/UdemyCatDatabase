
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

const catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  breed: String,
  color: String
});

const Cat = mongoose.model('Cat', catSchema);

const catList = ['pearl','orion', 'amici', 'cassie'];

// SERVER

app.listen(3000, function() {
  console.log("Cat App server is now running!");
});

// ROUTES

app.get('/', function(request, response) {

  Cat.find({}, function(error, dbSearchResults) {
    if (error) {
      console.log('Error when finding items! \n');
      console.log(error);
    } else {
      console.log('All items successfully found! \n');
      console.log(dbSearchResults);

      response.render('cats', {
        catList: catList,
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
    } else {
      console.log('Cat successfully added!');
      console.log(createdCat);

      catList.push(newCatName);
      response.redirect('/');
    }
  });

});
