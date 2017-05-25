var express = require('express'),
    app = express(),
    port = process.env.PORT || 5000;

app.set('port',port);
app.use(express.static('website'));

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});
