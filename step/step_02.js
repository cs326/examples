var step = require('step')
  , fs   = require('fs');

step(
  // Loads two files in parallel
  function loadStuff() {
    fs.readFile(__filename, this.parallel());
    fs.readFile("/etc/passwd", this.parallel());
  },
  // Show the result when done
  function showStuff(err, code, users) {
    if (err) throw err;
    console.log(code);
    console.log(users);
  }
);

