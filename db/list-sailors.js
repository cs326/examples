// commander is a library for getting passwords from commandline:
var program = require('commander');
var sailors = require('./sailors');

function run (user, pass) {
    var db = sailors.db('richards', pass);
    db.listSailors(function (err, result) {
        var rows = result.rows;
        for (var i = 0; i < rows.length; i++) {
            console.log('   ' + rows[i].sname);
        }
        process.exit(0);
    });
}

program.prompt('User: ', function (user) {
    program.password('Password: ', function (pass) {
        run(user, pass);
    });
});

