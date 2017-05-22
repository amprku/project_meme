'use strict';

var mongoose = require('mongoose'),
  Meme = mongoose.model('Memes');

exports.list_all_memes = function(req, res) {
  Meme.find({}, function(err, meme) {
    if (err)
      res.send(err);
    res.json(meme);
  });
};

exports.create_a_meme = function(req, res) {
  var new_meme = new Meme(req.body);
  new_meme.save(function(err, meme) {
    if (err)
      res.send(err);
    res.json(meme);
  });
};

exports.read_a_meme = function(req, res) {
  Meme.findById(req.params._id, function(err, meme) {
    if (err)
      res.send(err);
    res.json(meme);
  });
};

exports.update_a_meme = function(req, res) {
  Meme.findOneAndUpdate(req.params._id, req.body, {new: true}, function(err, meme) {
    if (err)
      res.send(err);
    res.json(meme);
  });
};

exports.delete_a_meme = function(req, res) {
  Meme.remove({
    _id: req.params._id
  }, function(err, meme) {
    if (err)
      res.send(err);
    res.json({ message: 'meme successfully deleted' });
  });
};
