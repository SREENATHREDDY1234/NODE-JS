const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

const users = new Map();

io.on("connection",(socket)=>{
    console.log("A user is connected");
    socket.on("join",(username)=>{
        users.set(socket.id,username);
        io.emit("onlineUsers",Array.from(users.values()));
        io.emit("userJoined",username);
    })

    socket.on("userMessage",(message)=>{
        io.emit("message",users.get(socket.id),message);
    })

    socket.on("disconnect",()=>{
        io.emit("userLeft",users.get(socket.id));
        io.emit("onlineUsers",Array.from(users.values()));
        console.log("user disconnected.");
    })
})

server.listen(3000,()=>{
    console.log("server is now running in http://localhost:3000/.");
    
})