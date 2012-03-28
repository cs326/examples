
// An array to hold pairs of numbers:
var pairs = [];

// A function to create pairs:
var pair = function (n1, n2) {
    return {first : n1,
            second: n2}; 
};

// A route handler for adding pairs:
exports.add_pairs = function (req, res) {
    var n1;
    var n2;

    // Process only if we have the proper args:
    if (req.body.n1 &&
        req.body.n2) {

        // Extract numbers:
        n1 = parseInt(req.body.n1);
        n2 = parseInt(req.body.n2);

        // Create the pair:
        p  = pair(n1, n2);

        // Add it to the array:
        pairs.push(p);

        console.log('Added Pair: ' + 
                    JSON.stringify(p));
    }
};

// A function to return empty pairs formatted as xml:
var nopair_xml = function () {
    var xml = '';
    xml += '<pair>';
    xml += '</pair>';
    return xml;
};

// A function to return pairs formatted as xml:
var pair_xml = function (n1, n2) {
    var xml = '';
    xml += '<pair>';
    xml += '<first>'  + n1 + '</first>';
    xml += '<second>' + n2 + '</second>';
    xml += '</pair>';
    return xml;    
};

// A route handler for getting pairs (XML Format):
exports.get_pairs_xml = function (req, res) {
    // Generate the xml if we have a pair:
    var xml;  // The xml to return
    var pair; // The pair received from client (JSON)

    // If we have a request body:
    if (req.body) {
        // We assume it is JSON, so it has already been parsed:
        var obj = req.body;
        
        console.log('Message Received: ' + JSON.stringify(obj));
        console.log('Current Pairs:');
        console.log(pairs);

        // If the index is in the pairs array:
        if (obj.index in pairs) {
            // Get the pair and convert to XML:
            pair = pairs[obj.index];
            xml  = pair_xml(pair.first,
                            pair.second);
        }
    }

    // Generate the xml if no pair is found:
    if (!xml) {
        xml = nopair_xml();
    }

    console.log('Sending XML: ' + xml);

    // Set content type to be xml:
    res.contentType('text/xml');
    res.send(xml);
};

// A route handler for getting pairs (JSON Format):
exports.get_pairs_json = function (req, res) {
    var pair = {}; // The pair received from client (JSON)

    // If we have a request body:
    if (req.body) {
        // We assume it is JSON, so it has already been parsed:
        var obj = req.body;
        
        console.log('Message Received: ' + JSON.stringify(obj));
        console.log('Current Pairs:');
        console.log(pairs);

        // If the index is in the pairs array:
        if (obj.index in pairs) {
            // Get the pair:
            pair = pairs[obj.index];
        }
    }

    console.log('Sending pair: ' + JSON.stringify(pair));

    // Set content type to be xml:
    res.contentType('application/json');
    res.send(pair);
};