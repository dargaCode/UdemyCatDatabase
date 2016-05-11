
'use strict'; // so let will work

// DEPENDENCIES

const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// SETTINGS

mongoose.connect('mongodb://localhost/cat_app');

// CONSTANTS

const catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  breed: String,
  color: String
});

const Cat = mongoose.model('Cat', catSchema);

// SERVER

app.listen(3000, function() {
  console.log("Cat App server is now running!");
});

// ROUTES

app.get('/', function(request, response) {
  response.send('I am a cat app');
});





// MAIN

// TWO ALTERNATE WAYS TO CREATE CATS

  // OPTION 1

    // const newCat = new Cat({
    //   name: 'Amici',
    //   age: 2,
    //   breed: 'American Short-Hair',
    //   color: 'White'
    // });

    // newCat.save(function(error, item) {
    //   if(error) {
    //     console.log('Something went wrong \n');
    //     console.log(error);
    //   } else {
    //     console.log('Item was successfully saved! \n');
    //     console.log(item);
    //   }
    // });

  // OPTION 2

    // Cat.create({
    //   name: 'Cassie',
    //   age: 13,
    //   breed: 'Birman',
    //   color: 'Tan'
    // }, function(error, item) {
    //   if(error) {
    //     console.log('Cat creation failed! \n');
    //     console.log(err);
    //   } else {
    //     console.log('Cat creation succeeded! \n');
    //     console.log(item);
    //   }
    // });

Cat.find({}, function(error, item) {
  if (error) {
    console.log('Error when finding items! \n');
    console.log(error);
  } else {
    console.log('All items successfully found! \n');
    console.log(item);
  }
});
