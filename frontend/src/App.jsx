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
                fetchTasks();
            } else {
                console.error('Failed to create todo');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchTasks = async () => {
        try {
            const response = await axios.get("/api/todoDb");
            setTasks(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/delete/${id}`);
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <>
            <div>
                <h3>Tasks : {tasks.length}</h3>
                {
                    tasks.map((task) => (
                        <div key={task._id}>
                            <h4>{task.name}</h4>
                            <button onClick={() => handleDelete(task._id)}>x</button>
                        </div>
                    ))
                }
            </div>
            <br /><br /><br />
            <div>
                <form onSubmit={handleSubmit}>
                    <label>
                        Todo Name:
                    </label><br />
                    <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}

export default App
