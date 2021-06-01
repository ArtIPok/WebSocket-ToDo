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

  socket.on('addTask', (newTask) => {
    tasks.push(newTask);
    console.log(tasks);
    socket.broadcast.emit('addTask', newTask);
    console.log('user: ' + socket.id + 'just add new task' + newTask);
  });

  socket.on('removeTask', (idTask) => {
    const idTaskToRemove = tasks.find(tasks => tasks.id === idTask);
    const indexTask = tasks.indexOf(idTaskToRemove);

    if(idTaskToRemove) {
      tasks.splice(indexTask, 1);
    }
    console.log(tasks);
    socket.broadcast.emit('removeTask', idTask);
  });
});

app.use((req, res) => {
  res.status(404).send({message: 'Not found...'});
});
