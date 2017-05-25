
var express = require('express'),
app = express(),
port = process.env.PORT || 3000,
restful = require('node-restful'),
mongoose = restful.mongoose,
bodyParser = require('body-parser'),
dir = require('node-dir');



//start mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/');
//meme image schema
var Memes = require('./models/memeModel.js')
var Users = require('./models/userModel.js')
//link api path to Schemas
Memes.register(app, '/memes');
Users.register(app, '/users');



var fs = require('fs');
mongoose.connection.on('open',function(){
  console.error('mongo opened')
  console.error(Users)
  Memes.remove(function(err){
    if(err) throw err;
    console.error('removed old');
    //first, on server start, put all image paths into model.
    var imgDir = './bin/images/formatted';
    dir.files(imgDir, function(err, files) {
      if (err) throw err;
      for (img of files){
        var fileName = img.replace('.\\bin\\images\\formatted',"")
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


app.listen(port);
console.log('todo list RESTful API server started on: ' + port);
