var step = require('step')
  , fs   = require('fs');

step(
  // Read this file:
  function readSelf () {
    // `this` is bound to the next callback function.
    fs.readFile(__filename, this);
  },

  // Convert the Buffer object read in from `readFile` into a string
  // by calling the Buffer's toString method.  Errors are passed as
  // the first argument which is the default in node.js. The second
  // argument is the result of the previous call.
  function toString (err, text) {
    // If there is an error and we throw an exception, the exception
    // will automatically be passed to the next callback function if
    // it exists, otherwise it will be thrown out to the step call:
    if (err) throw err;
    // `return` will automatically call the next callback function and
    // pass the return value as the second argument:
    return text.toString(); 
  },

  // Capitalize the text that was read from previous function. 
  function capitalize (err, text) {
    if (err) throw err;
    return text.toString().toUpperCase();
  },

  // This function simply displays the result of the previous call:
  function showIt (err, newText) {
    if (err) throw err;
    console.log(newText);
  }
);

