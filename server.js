const express = require('express');
const socket = require('socket.io');

const app = express();

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on Port:', 8000);
});

const io = socket(server);

const tasks = [];

io.on('conection', (socket) => {
  console.log('New user open our app, his id: ' + socket.id);

  socket.broadcast.emit('consection', updateDate(tasks));

  socket.on('addTask', (task) => {
    tasks.push(task);
    console.log(tasks);
    socket.broadcast.emit('addTask', addTask);
  });

  socket.on('removeTask', (indexTask) => {
    // const indexTask = tasks.indexOf(socket.id);

    tasks.splice(indexTask, 1);
    console.log(tasks);
    socket.broadcast.emit('removeTask', removeTask);
  });
});

app.use((req, res) => {
  res.status(404).send({message: 'Not found...'});
});
