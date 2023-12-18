import './App.css';
import { React, useState, useEffect } from 'react'
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import About from './components/About';


const App = () => {

  const [showAddTask, setShowAddTask] = useState(false)


  const [tasks, setTasks] = useState([])

  useEffect(() => {

    const getTasks = async () => {
      const tasksFromExpressServer = await fetchTasks()
      setTasks(tasksFromExpressServer)
    }
    getTasks()
  }, [])

  const fetchTasks = async () => {

    const res = await fetch('https://tasktrackerbackend-bofr.onrender.com/api/tasks')
    const data = await res.json()
    return data
  }

  const fetchTask = async (id) => {

    const res = await fetch(`https://tasktrackerbackend-bofr.onrender.com/api/tasks/${id}`)
    const data = await res.json()
    return data
  }

  //Add Task
  const addTask = async (task) => {
    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    await fetch('https://tasktrackerbackend-bofr.onrender.com/api/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)

    })
    const newTask = { ...task }

    setTasks([...tasks, newTask])
  }

  // Delete Task
  const deleteTask = async (id) => {

    await fetch(`https://tasktrackerbackend-bofr.onrender.com/api/tasks/${id}`, {
      method: 'DELETE',

    })
    setTasks(tasks.filter((task) => task._id !== id))
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id); // Await the result of fetchTask
    const updTask = { ...taskToToggle, reminder: !taskToToggle.data.reminder };
    const res = await fetch(`https://tasktrackerbackend-bofr.onrender.com/api/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();

    setTasks(tasks.map((task) => (task._id === id ? { ...task, reminder: data.reminder } : task)));
  };



  return (
    <Router>
      <div className='container'>
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />

        <Route path="/" exact render={(props) => (
          <>
            {showAddTask && <AddTask onAdd={addTask} />}
            {tasks.length > 0 ? <Tasks taskprops={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'No Tasks to Show'}
          </>
        )} />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>

  )
}

export default App;
