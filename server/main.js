var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('public'));

//Cuando la app reciba una peticion get
app.get('/hello', function(req,res){
    res.status(200).send("Hola mundo omar");
});

io.on('connection', function(socket){
    //console.log("Alguien se ha conectado con socket");
    
    socket.broadcast.emit('newconnection', "Un usuario se ha conectado");
    
    //io.emit('newconnection', "Un usuario se ha conectado");
    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    /*socket.emit('messages', {
        id: 1,
        text: "Hola soy un mensaje del servidor",
        author: "Omar Rosales"
    });*/

    socket.on('sentmsg', function(msg){
        //io.broadcast.emit('newmsg', msg);
        socket.broadcast.emit('newmsg', msg);
    });
});

server.listen(8080, function(){
    console.log("Servidor corriendo en http://localhost:8080");
});