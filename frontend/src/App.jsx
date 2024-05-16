import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
const [tasks, setTasks] = useState([])
const [name, setName] = useState('');

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
      const response = await axios.post('/api/create', { name });
      if (response.status === 201) {
          // Do something with the response data if needed
      } else {
          console.error('Failed to create todo');
      }
  } catch (error) {
      console.error('Error:', error);
  }
};


useEffect(()=>{
  axios.get("/api/todoDb")
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
      <div>
      <form onSubmit={handleSubmit}>
            <label>
                Todo Name:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <button type="submit">Submit</button>
        </form>
      </div>
    </>
  )
}

export default App
