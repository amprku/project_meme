'use strict';
module.exports = function(app) {
var memes = require('../controllers/memeController');

  // todoList Routes
  app.route('/memes')
    .get(memes.list_all_memes)
    .post(memes.create_a_meme);


  app.route('/memes/:_id')
    .get(memes.read_a_meme)
    .put(memes.update_a_meme)
    .delete(memes.delete_a_meme);
};
