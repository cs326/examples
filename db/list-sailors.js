var sailors = require('sailors');

var db = sailors.db('richards');
db.listSailors(function (err, result) {
    var rows = result.rows;
    for (var i = 0; i < rows.length; i++) {
        console.log('   ' + rows[i].sname);
    }
    process.exit(0);
});

