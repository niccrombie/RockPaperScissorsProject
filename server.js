//webserver
var express = require('express');
var app = express();
var server = app.listen(3001);
app.use(express.static('public'));
//sockets
var socket = require('socket.io');
var io = socket(server);
io.sockets.on('connection', newConnection);

function newConnection(socket){
    console.log("new connection socket id: " + socket.id );
    socket.on('Choice', mouseMsg);
    
    function mouseMsg(data) {
        socket.broadcast.emit('Choice', data);
        console.log(data)
        
    }
    socket.on ('new', newGame);
    function newGame() {
        console.log('new game');
        socket.broadcast.emit('new');
    }
    socket.on ('disconnect', disconnected);
    function disconnected() {
        console.log("client disconnected" + socket.id);
    }
}

console.log("my server is running !!!");
console.log("express makes it easier to host a server !!!");
console.log("now we added nodemon to restart the server and update it everytime we save over server.js")
