import React from 'react';
import io from 'socket.io';

class App extends React.Component {

  state = {
    tasks: [],
    newTask: ''
  };

  componentDidMount() {
    this.socket = io();
    this.socket.on('addTask', (task) => this.addTask(task));
  };

  addTask = (task) => {
    this.setState({
      tasks: [],
      newTask: ''
    });
  };

  render() {
    const { tasks, newTask } = this.state;

    return (
      <div className="App">
        
        <header>
          <h1>ToDoList.app</h1>
        </header>
        
        <section className="tasks-section" id="tasks-section">
          <h2>Tasks</h2>
          <ul className="tasks-section_list" id="tasks-list" >
            {tasks.map((task) => (
              <li class="task" key={task.id}>
                {task.name}
                <button class="btn btn--red">Remove</button>
              </li>
            ))}
      </ul>

      <form id="add-task-form">
        <input 
          className="text-input" 
          autocomplete="off" 
          type="text" 
          placeholder="Type your description" 
          id="task-name"
          // value={newTask}
        />
        <button className="btn" type="submit">Add</button>
      </form>

        </section>
      </div>
    );
  };
};

export default App;
