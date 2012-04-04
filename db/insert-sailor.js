var program = require('commander');
var sailors = require('sailors');

function run(user, pass) {
    var db = sailors.db(user, pass);

    // Command line arguments:
    if (process.argv.length != 5) {
        console.log('Usage: node insert-sailor.js name rating age');
        process.exit(1);
    } else {
        var n = process.argv[2];
        var r = process.argv[3];
        var a = process.argv[4];
        db.addSailor({sname : n,
                      rating: r,
                      age   : a},
                     function (err, obj) {
                         if (err) {
                             console.log(err.toString());
                             console.log('Could not add sailor!');
                         } else {
                             console.log('Added sailor ' + obj.sname);
                         }
                         process.exit(0);
                     });
    }
}

program.prompt('User: ', function (user) {
    program.password('Password: ', function (pass) {
        run(user, pass);
    });
});
