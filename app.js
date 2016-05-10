
'use strict'; // so let will work

// DEPENDENCIES

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

