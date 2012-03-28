// This function
var get_msg = function () {
	var req = $.ajax({
		type: 'GET',
		url : '/get-msg'
	});
	
	req.done(function (data) {
		console.log('received data: ' + data.msg);
		$('#display').text(data.msg);
	});
};

var set_msg = function () {
	var msg = $('#msg').text();
	var req = $.ajax({
		type: 'POST',
		url : '/set-msg',
		data: { 'msg' : msg }
	});
	
	req.done(function (data) {
		var notify = $('#notify');
		notify.html('Message "' + data.msg + '" Received');
		$('#display').text(data.msg);
		notify.fadeOut(function () {
			notify.empty('slow');
			notify.show();
		});
	});
};

var interval_id;

var start_polling = function () {
	interval_id = setInterval(get_msg, 30);
};

var stop_polling = function () {
	if (interval_id) {
		clearInterval(interval_id);
	}
};

$(function () {
	get_msg();
	start_polling();
	
	$('#msg').bind('change', function (event) {
		set_msg();
	});
});