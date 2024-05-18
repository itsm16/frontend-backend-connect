import express from 'express'
import cors from 'cors'
import connectDb from './db.js';
import todoModel from './model.js';
connectDb();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json())

const tasks = [
    {
        id:1,
        name:"Eat"
    },
    {
        id:2,
        name:"Sleep"
    },
    {
        id:3,
        name:"Code"
    }
]

app.get("/", (req, res) => {
    res.send("App's Running")
})

app.get("/api/tasks", (req, res) => {
    res.send(tasks)
})

app.get("/api/create", async (req, res) => {
    await todoModel.create({name: "Game"})
    res.redirect("/")
})

app.post("/api/create", async (req, res) => {
    const {name} = req.body;
    await todoModel.create({name})
    res.status(201).send({ message: "Todo created successfully" });
})

app.get("/api/todoDb", async (req, res) => {
    try {
      const entries = await todoModel.find();
      res.send(entries);
    } catch (error) {
      console.error('Error fetching todos from database:', error);
      res.status(500).send('Internal Server Error');
    }
  });  

// New delete route
app.delete("/api/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await todoModel.findByIdAndDelete(id);
        res.status(200).send({ message: "Todo deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: "Error deleting todo" });
    }
})

app.listen(3000, () => {
    console.log("Server is Running")
})
