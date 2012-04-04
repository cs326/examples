var pg = require('pg');

// Configuration.
var host = 'db-edlab.cs.umass.edu';
var port = 7391;

// The postgres client.
var client;

exports.db = function (user, db) {
    if (!db) {
        db = user;
    }

    var obj = {};
    obj.conn = 'tcp://' + user + '@' + host + ':' + port + '/' + db;
    obj.listSailors = listSailors;
    obj.addSailor   = addSailor;
    return obj;
}

function listSailors (cb) {
    var that = this;
    pg.connect(that.conn, function (err, client) {
        client.query('select * from sailors;',
                     function (err, result) {
                         cb(err, result)
                     });
    });
};

function addSailor(obj, cb) {
    var that = this;
    if (obj.sname && obj.rating && obj.age) {
        pg.connect(that.conn, function (err, client) {
            var sql = 'insert into sailors values(default, $1, $2, $3);';
            client.query(sql, [obj.sname, obj.rating, obj.age],
                         function (err, result) {
                             cb(err, obj)
                         });
        });
    }
    else {
        throw "Invalid sailor object: " + JSON.stringify(obj);
    }
};
