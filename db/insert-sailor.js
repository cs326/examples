var sailors = require('sailors');

var db = sailors.db('richards');

// Command line arguments:
if (process.argv.length != 5) {
    console.log(process.argv);
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