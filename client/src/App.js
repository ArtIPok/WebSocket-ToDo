import React from 'react';
import io from 'socket.io-client';
import randomID from '@arturp/random-id-generator';

class App extends React.Component {

  state = {
    tasks: [],
    taskName: ''
  };

  componentDidMount() {
    this.socket = io('http://localhost:8000/');
    this.socket.on('addTask', (task) => this.addTask(task));
    this.socket.on('removeTask', (id) => this.removeTask(id));
    this.socket.on('updateData', (tasks) => this.updateData(tasks));
  };


  submitForm = (event) => {
    event.preventDefault();

    const task = { id: randomID(16), name: this.state.taskName };
    this.addTask(task);
    this.socket.emit('addTask', task);
    this.setState({
      task: [...this.state.tasks, task],
    });
  };

  addTask = (task) => {
    this.setState({
      tasks: [...this.state.tasks, task],
      taskName: '',
    });
  };

  removeTask = (id, event) => {
    this.setState({ tasks: this.state.tasks.filter(tasks => tasks.id !== id) });
    if(event === true) {
      this.socket.emit('removeTask', id);
    };
  };

  updateData = (tasks) => {
    this.setState({ tasks: tasks });
  };

  render() {
    const { tasks, taskName } = this.state;

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
                <button 
                  class="btn btn--red"
                  onClick={() => this.removeTask(task.id, true)}
                >
                  Remove
                </button>
              </li>
            ))}
      </ul>

      <form id="add-task-form" onSubmit={(submit) => this.submitForm(submit)}>
        <input 
          className="text-input" 
          autocomplete="off" 
          type="text" 
          placeholder="Type your description" 
          id="task-name"
          value={taskName}
          onChange={(event) => this.setState({ taskName: event.target.value })}
        />
        <button className="btn" type="submit">Add</button>
      </form>

        </section>
      </div>
    );
  };
};

export default App;
