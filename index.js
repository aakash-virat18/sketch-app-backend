const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require('cors');

const app = express();
const url = app.settings.env === 'development' ? 'http://localhost:3000/' : 'https://sketch-mzemxk9gf-aakash-virat18s-projects.vercel.app'
app.use(cors({ origin: url }))
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: 'http://localhost:3000/' });

io.on("connection", (socket) => {
    // ...
    socket.on('beginPath', (args) => {
        socket.broadcast.emit('beginPath', args)
    })
    socket.on('movePath', (args) => {
        socket.broadcast.emit('movePath', args)
        console.log('moving')
    })
    socket.on('changeConfig', (arg) => {
        socket.broadcast.emit('changeConfig', arg)
        console.log('changing')
    })
});

httpServer.listen(4000);