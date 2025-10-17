const express = require('express');
const http = require('node:http');
const swServer = require('socket.io');
const cors = require('cors');


const app = express();

app.use(cors(
  {
    origin: '*'
  }
));

const httpServer = http.createServer(app);

const io = swServer(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    meghod: ["GET", "POST"],
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log('new user has been connected!', socket.id);
  socket.on('msg-from-client', (data) => {
    console.log(data);
    io.emit('msg-from-server', data);
  });
});

io.on('disconnect', () => {
  console.log('user is disconnected!');
});



app.get('/', (req, res) => {
  res.send('Express server is running!');
});

httpServer.listen(3000, 'localhost', () => {
  console.log('http server is running at http://localhost:3000');
});