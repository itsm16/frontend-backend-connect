import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
const [tasks, setTasks] = useState([])

useEffect(()=>{
  axios.get("/api/tasks")
  .then((response)=>{setTasks(response.data)})
  .catch((err)=>{console.log(err)})
})

  return (
    <>
      <div>
        <h3>Tasks</h3>
        <h4>{tasks.length}</h4>

        {
        tasks.map((task,index)=>(<h4 key={task.id} >{task.name}</h4>))
        }

      </div>
    </>
  )
}

export default App
