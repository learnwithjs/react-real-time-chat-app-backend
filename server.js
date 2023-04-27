const express = require('express');
const {Server} = require('socket.io');
const http = require('http');
const cors = require('cors'); 
const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origin:"*",
        methods:["GET", "POST"]
    }
})

io.on("connection", (socket)=> {
    console.log('server socket id == ', socket.id);

    socket.on('joinRoom', (room)=> {
        console.log('room name is == ', room);
        socket.join(room);
    })

    socket.on('newMessage', ({newMessage, room})=> {
        console.log("message is == ", newMessage);
        console.log('room is == ', room)

        io.in(room).emit('getLatestMessage', newMessage)
    })
})

const port = 8000 || process.env.PORT 
server.listen(port, ()=> {
    console.log("server started on port == ", port);
})

app.get('/', (req, res)=> {
    res.send("Chat app is about to start.");
})