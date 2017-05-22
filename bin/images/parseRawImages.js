/**
*  First, delete existing image json, then:
*   Go through raw img in folder, create duplicates of images in "formatted" folder.
*   give each new img a unique id to be associated with in the "meme" Schema.
*   It will call the image by its URL.
*/

"use strict";
var fs = require('fs')
//shortid generates unique filenames for each img
var shortid = require('../../api/node_modules/shortid');
//chokidar is a dope file watcher.
var chokidar = require('../../api/node_modules/chokidar');
//function that duplicates file.
function copyFile(source, target) {
    return new Promise(function(resolve, reject) {
        var rd = fs.createReadStream(source);
        rd.on('error', rejectCleanup);
        var wr = fs.createWriteStream(target);
        wr.on('error', rejectCleanup);
        function rejectCleanup(err) {
          log(err)
            rd.destroy();
            wr.end();
            reject(err);
        }
        wr.on('finish', resolve);
        rd.pipe(wr);
    });
}
//listens to see if you put a file in the raw folder
var watchRaw = chokidar.watch('./raw', { persistent: true});
var log = console.log.bind(console);
watchRaw.on('add', path => {
  log(path);
  const fileType = path.split('.')[1];
  const newFileName = shortid.generate() + "." + fileType;

  copyFile("./"+path,'./formatted/'+newFileName)
})
