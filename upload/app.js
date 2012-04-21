
/**
 * Module dependencies.
 */

var express = require('express')
  , fs = require('fs')
  , routes = require('./routes');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser({uploadDir: './uploads'}));
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes
app.get('/', function (req, res) {
    res.send('<form method="post" enctype="multipart/form-data" action="/file-upload">'
      + '<p>Image: <input type="file" name="image" /></p>'
      + '<p><input type="submit" value="Upload" /></p>'
      + '</form>');
});

app.post('/file-upload', function (req, res, next) {
    // This will print the structure to the console:
    console.log(req.body);
    console.log(req.files);
    // We need to rename the file to the name of the file from the
    // client system:
    var image = req.files.image;
    var fname = image.name;
    fs.rename(image.path, './uploads/' + fname,
              function () {
                  // Simply redirect back to the form:
                  res.redirect('/');
              });
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
