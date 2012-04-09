var express = require('express');
var routes  = require('./routes');

var app = module.exports = express.createServer();

var io  = require('socket.io').listen(app);
io.set('log level', 1);

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
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
    res.redirect('/block.html');
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", 
            app.address().port, app.settings.env);

// Records the next block id:
var bid = 0;

// Maintains the list of active client blocks:
var blocks = {};

io.sockets.on('connection',
              function (socket) {
                  bid++;
                  
                  // Create block:
                  var block = { id : bid,
                                x  : 100,
                                y  : 100 };

                  // Add block:
                  blocks[bid] = block;

                  // Send back to client
                  socket.set('id', bid, function () {
                      var msg = { you  : block,
                                  them : blocks };
                      socket.emit('block', msg);
                  });

                  // Send to other clients
                  socket.broadcast.emit('+block', block);

                  // Register move events:
                  socket.on('move', function (block) {
                      var b = blocks[block.id];
                      b.x = block.x;
                      b.y = block.y;
                      socket.broadcast.emit('move', block);
                  });

                  socket.on('disconnect', function () {
                      socket.get('id', function (err, id) {
                          var block = blocks[id];
                          delete blocks[id];
                          socket.broadcast.emit('-block', block);
                      });
                  });
              });
