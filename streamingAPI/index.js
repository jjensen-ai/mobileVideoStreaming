const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

let users = [];
const port = 3001;

app.get('/', (req, res) => {
  res.send('Hello World');
});

let broadCaster;

const addUser = (uName, roomId) => {
  users.push({ uName: uName, roomId: roomId });
};

const userLeave = (uName) => {
  users.filter((user) => user.uName != uName);
};

const getCurrentUsers = (roomId) => {
  return users.filter((user) => user.roomId === roomId);
};

io.on('connection', (socket) => {
  console.log('Someone Connected');
  socket.on('join-room', ({ roomId, uName }) => {
    console.log(`User ${uName} joined Room: ${roomId}`);
    socket.join(roomId);
    addUser(uName, roomId);
    socket.to(roomId).emit('user-connected', uName);

    io.to(roomId).emit('all-users', getCurrentUsers(roomId));
    console.log(getCurrentUsers(roomId));

    socket.on('disconnect', () => {
      console.log('Disconnected');
      socket.leave(roomId);
      userLeave(uName);
      io.emit('all-users', getCurrentUsers(roomId));
    });
  });
});

io.sockets.on('connection', (socket) => {
  socket.on('broadcaster', () => {
    broadCaster = socket.id;
    socket.broadcast.emit('broadcaster');
    console.log('you got here, broadcaster');
  });
  socket.on('watcher', () => {
    socket.to(broadCaster).emit('watcher', socket.id);
    console.log('you got here, watcher');
  });
  socket.on('disconnect', () => {
    socket.to(broadCaster).emit('disconnectPeer', socket.uName);
    console.log('you got here and disconnected');
  });
  socket.on('offer', (roomId, message) => {
    socket.to(roomId).emit('offer', socket.id, message);
    console.log('you didnt get here');
  });
  socket.on('answer', (roomId, message) => {
    socket.to(roomId).emit('answer', socket.id, message);
  });
  socket.on('candidate', (roomId, message) => {
    socket.to(roomId).emit('candidate', socket.id, message);
  });
  socket.on('comment', (roomId, message) => {
    socket.to(roomId).emit('comment', socket.id, message);
  });
});

server.listen(port, () => {
  console.log(`Stream API listening on localhost ${port}`);
});
