'use strict';
var restful = require('node-restful'),
    mongoose = require('mongoose');

var MemeSchema = restful.model('memes', mongoose.Schema({
  fileName: {type:'string',required:true},
  fileType: String,
  Created_date: {
    type: Date,
    default: Date.now
  },
  relativePath: String
}))
 .methods(['get', 'post', 'put', 'delete']);

module.exports = MemeSchema;
