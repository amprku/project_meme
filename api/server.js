
var express = require('express'),
app = express(),
port = process.env.PORT || 3000,
mongoose = require('mongoose'),
bodyParser = require('body-parser'),
dir = require('node-dir');
restful = require('node-restful'),
mongoose = require('mongoose');

//meme image schema
var Memes = restful.model('memes', mongoose.Schema({
  fileName: String,
  fileType: String,
  Created_date: {
    type: Date,
    default: Date.now
  },
  relativePath: String
}))
 .methods(['get', 'post', 'put', 'delete']);

//start mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/memes');

var fs = require('fs');
mongoose.connection.on('open',function(){
  console.error('mongo opened')
  Memes.remove(function(err){
    if(err) throw err;
    console.error('removed old');
    //first, on server start, put all image paths into model.
    var imgDir = '../bin/images/formatted';
    dir.files(imgDir, function(err, files) {
      if (err) throw err;
      for (img of files){
        var fileName = img.replace('..\\bin\\images\\formatted',"")
        var fileType = fileName.split('.')[1]
        var memeImg = new Memes;
        memeImg.fileName = fileName;
        memeImg.fileType = fileType;
        memeImg.filename = img;
        memeImg.relativePath = img;
        memeImg.save(function(err,memeImg){
          if(err)throw err;
          console.error('saved image');
          });
        }
      });
    });

});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//link api path to Schema
Memes.register(app, '/memes');

//serve website
app.use(express.static('website'))

app.listen(port);
console.log('todo list RESTful API server started on: ' + port);
