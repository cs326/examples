var sailors = require('sailors');

// Simple example of connecting to postgres:
sailors.connect('richards');
sailors.sailors(function (res) {
    console.log('Sailors:');
    for (var i = 0; i < res.length; i++) {
        console.log('   ' + res[i]);
    }
    sailors.end();
});
