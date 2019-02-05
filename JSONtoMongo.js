'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
  mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  // Listing = require('./ListingSchema.js'),
  config = require('./config');

/* Connect to your database */

mongoose.connect(config.db.uri)
  .then(() => {
    console.log('Database successful');
  })
  .catch(err => {
    console.log(err);
  })

/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
 */
var Listing = require('./ListingSchema.js');

fs.readFile('listings.json', 'utf8', function (err, data) {
  var jsonData = JSON.parse(data);
  jsonData.entries.forEach(entrie => {
    addModel(entrie);
  });
});

function addModel(entrie) {
  if (entrie.coordinates == undefined) {
    entrie.coordinates = '';
  }

  var listing = new Listing({
    code: entrie.code,
    name: entrie.name,
    coordinates: {
      latitude: entrie.coordinates.latitude,
      longitude: entrie.coordinates.longitude
    },
    address: entrie.address
  });

  listing.save(function (err) {
    console.log('saved');
  })
}
/* 
  Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */