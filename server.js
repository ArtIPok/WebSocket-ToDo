const express = require('express');
const socket = require('socket.io');

const app = express();

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on Port:', 8000);
});

const io = socket(server);

const tasks = [];

io.on('connection', (socket) => {

  socket.emit('updateData', tasks);

  socket.on('addTask', (taskName) => {
    tasks.push(taskName);
    socket.broadcast.emit('addTask', taskName);
  });

  socket.on('removeTask', (idTask) => {
    const idTaskToRemove = tasks.find(tasks => tasks.id === idTask);
    const indexTask = tasks.indexOf(idTaskToRemove);

    if(idTaskToRemove) {
      tasks.splice(indexTask, 1);
    }
    socket.broadcast.emit('removeTask', idTask);
  });
});

app.use((req, res) => {
  res.status(200).send({message: 'everythings is ok!'});
});
