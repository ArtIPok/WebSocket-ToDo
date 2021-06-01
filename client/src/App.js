import React from 'react';
import io from 'socket.io';

const newTaskInput = document.getElementById('task-name');
const tasks = [];

class App extends React.Component {
  render() {
    this.socket = io();

    this.socket.on('task', task => {
      addTask(task);
    });

    function addTask() {
      const task = newTaskInput.nodeValue;

      tasks.appendChild(task);
    }

    return (
      <div className="App">
        
        <header>
          <h1>ToDoList.app</h1>
        </header>
        
        <section className="tasks-section" id="tasks-section">
          <h2>Tasks</h2>
          <ul className="tasks-section_list" id="tasks-list" >
            {tasks.map(item => (
              <li class="task">
                {item.tasks}
                <button class="btn btn--red">Remove</button>
              </li>
            ))}
      </ul>

      <form id="add-task-form">
        <input className="text-input" autocomplete="off" type="text" placeholder="Type your description" id="task-name" />
        <button className="btn" type="submit">Add</button>
      </form>

        </section>
      </div>
    );
  };
};

export default App;
