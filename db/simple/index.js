var pg = require('pg');

// Configuration.
var host = 'db-edlab.cs.umass.edu';
var port = 7391;

// The postgres client.
var client;

exports.connect = function (user, db) {
    if (!db) {
        db = user;
    }

	  var conn = 'tcp://' + user + '@' + host + ':' + port + '/' + db;
	  client = new pg.Client(conn);
	  client.connect();
};

exports.sailors = function (cb) {
	  var query = client.query('select * from sailors;');
	  var res   = [];
	  query.on('row', function (row) {
		    res.push(row.sname);
	  });

    query.on('end', function () {
        cb(res);
    });
};

exports.end = function () {
	  client.end();
};
