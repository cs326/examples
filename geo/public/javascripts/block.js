var Block = { };

Block.init = function () {
    // Create the socket to the server:
    var socket = io.connect();

    // This is this client's block:
    var block;
    
    // Grab the board element:
    var board  = $('#board');
    
    // Register the mousemove event for the board:
    board.mousemove(function (e) {
        // Change the displayed coordinates:
        $('#pos').html(e.pageY + ', ' + e.pageX);
        // Update the block state:
        block.x = e.pageX;
        block.y = e.pageY;
        // Move the block:
        $('#block_' + block.id).css({'top' : e.pageY,
                                     'left': e.pageX});
        // Notify server of the changed position for this block:
        socket.emit('move', block);
    });

    // Register the connect message on the socket:
    socket.on('connect', connect);

    // This function is invoked when we receive a 'connection' message:
    function connect () {
        board.empty();
        socket.on('block'  , rcv_block);
        socket.on('+block' , rcv_add_block);
        socket.on('-block' , rcv_remove_block);
        socket.on('move'   , rcv_move_block);
    }

    // This function is invoked when we receive a 'block' message.
    // It receives a message { you, them } where you is the block
    // created by the server and them is a list of all the other
    // current peer blocks:
    function rcv_block (msg) {
        // Get the block send from the server:
        block   = msg.you;
        
        // Create the div element for the block:
        var block_div = $('<div class="block" id="block_' + block.id + '">');

        // Set the contents of the block to the block id:
        block_div.html(block.id);

        block_div.css({'top' : block.y,
                       'left': block.x});

        // Add the block to the board:
        board.append(block_div);
        
        // Add all the peer blocks to the board:
        for (var id in msg.them) {
            var other = msg.them[id];
            if (other.id != block.id) {
                var other_div = $('<div class="block" id="block_' + other.id + '">');
                other_div.html(other.id);
                other_div.css({'top' : other.y,
                               'left': other.x});
                board.append(other_div);
            }
        } 
    }

    // Handles incoming messages for peer blocks that connected:
    function rcv_add_block (msg) {
        var block = msg;
        var block_div = $('<div class="block" id="block_' + block.id + '">');
        block_div.html(block.id);
        block_div.css({'top' : block.x,
                       'left': block.y});
        board.append(block_div);
    }

    // Handles incoming messages for peer blocks that have disconnected:
    function rcv_remove_block (msg) {
        var block = msg;
        $('#msg').html('Block ' + block.id + ' left the scene.');
        $('#block_' + block.id).remove();
        $('#msg').fadeOut(800, function () {
            $('#msg').empty().show();
        });
    }

    // Handles incoming messages for peer blocks that have moved:
    function rcv_move_block (msg) {
        var peer_block = msg;
        console.log('Received: ' + peer_block.id + ': ' 
                    + peer_block.x + ', ' + peer_block.y);
        $('#block_' + peer_block.id).css({'top' : peer_block.y,
                                          'left': peer_block.x});
    }

};
