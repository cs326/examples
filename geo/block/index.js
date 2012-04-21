// Records the next block id:
var bid = 0;

// Maintains the list of active client blocks:
var blocks = {};

// The handler for the move event message:
function moveEvent(socket, msg) {
	var b = blocks[msg.id];
	b.x = msg.x;
	b.y = msg.y;
	socket.broadcast.emit('move', msg);
}

// The handler for the disconnect event message:
function disconnectEvent(socket) {
	socket.get('id', function(err, id) {
		var block = blocks[id];
		delete blocks[id];
		socket.broadcast.emit('-block', block);
	});
}

// The handler for the connect event message:
function connectEvent(socket) {
	// Next block id number:
	bid++;

	console.log('connection received: ' + bid);

	// Create block:
	var block = {
		id: bid,
		x: 100,
		y: 100
	};

	// Add block:
	blocks[bid] = block;

	// Send back to client
	socket.set('id', bid, function() {
		var msg = {
			you: block,
			them: blocks
		};
		socket.emit('block', msg);
	});

	// Register message events:
	socket.on('move', function(msg) {
		moveEvent(socket, msg);
	});

	socket.on('disconnect', function() {
		disconnectEvent(socket);
	});

	// Send to other clients:
	socket.broadcast.emit('+block', block);
}

// The only public function:
exports.listen = function(io) {
	// Register the connection event:
	io.sockets.on('connection', connectEvent);
};

