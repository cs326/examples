// The message:
var msg = 'Hello, World';

// This handler function sends a JSON message containing
// "the message" back to the client:
exports.get_msg = function (req, res) {
	// Set the content type:
	res.contentType('application/json');

	console.log('get: ' + msg);

	// Send the result:
	res.send({ 'msg' : msg });
};

// This handler function receives a JSON message from
// the client containing a new message to set. It also
// returns the new message back to the client:
exports.set_msg = function (req, res) {
	// Get the new message:
	var data = req.body;

	console.log('set: ' + data.msg);

	// Set the new message:
	if (data) {
		msg = data.msg;
	}
	
	// Send the new message:
	res.contentType('application/json');
	res.send({ 'msg' : msg });	
};