var fs = require('fs');

function save(file, obj, fn) {
    var json = JSON.stringify(obj);
    fs.writeFile(file, json, fn);
}

function load(file, fn) {
    fs.readFile(file, function (err, data) {
        if (err) {
            fn(err);
        }
        else {
            var obj = JSON.parse(data);
            fn(err, obj);
        }
    });
}

function timestamp() {
    var t = new Date();
    return t.toString();
}

var records = [
    {fname: 'Tim',
     lname: 'Richards',
     balance: 25,
     access: timestamp()},

    {fname: 'John',
     lname: 'Doe',
     balance: 2500,
     access: timestamp()}
];

// Save to disk:
save('records.json',
     records,
     function (err) {
         if (err) {
             console.log('problem saving');
         } else {
             load('records.json', function (err, obj) {
                 if (err) {
                     console.log('problem reading');
                 } else {
                     console.log('FIRST LOAD:');
                     console.log(obj);
                     // Add new record:
                     records.push({fname: 'Jane',
                                   lname: 'Doe',
                                   balance: 1500,
                                   access: timestamp()});
                     save('records.json',
                          records,
                          function (err) {
                              if (err) {
                                  console.log('problem saving');
                              } else {
                                  console.log('SECOND LOAD:');
                                  load('records.json', function (err, obj) {
                                      if (err) {
                                          console.log('problem reading');
                                      } else {
                                          console.log(obj);
                                      }
                                  });
                              }
                          });
                 }
             });
         }
     });
