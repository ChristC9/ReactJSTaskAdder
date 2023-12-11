import './App.css';
import { React, useState, useEffect } from 'react'
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';


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
      
      const res = await fetch('http://localhost:5000/api/tasks')
      const data = await res.json()
      return data
  }

  //Add Task
  const addTask = async (task) => {
    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    await fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)

    })
    const newTask = { ...task}

    setTasks([...tasks, newTask])
  }

  // Delete Task
  const deleteTask =async (id) => {

    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: 'DELETE',

    })
    setTasks(tasks.filter((task) => task._id !== id))
  }

  // Toggle Reminder
  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => task._id === id ? { ...task, reminder: !task.reminder } : task))
  }

  return (
    <div className='container'>
      <Header onAdd={()=> setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
      {showAddTask && <AddTask  onAdd={addTask}/>}
      {tasks.length > 0 ? <Tasks taskprops={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'No Tasks to Show'}
    </div>

  )
}

export default App;
