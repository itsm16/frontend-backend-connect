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

app.get("/",(req,res)=>{
    res.send("App's Running")
})

app.get("/api/tasks",(req,res)=>{
    res.send(tasks)
})

app.get("/api/create",async (req,res)=>{
    await todoModel.create({name: "Game"})
    res.redirect("/")
})

app.post("/api/create",async (req,res)=>{
    const {name} = req.body;
    await todoModel.create({name})

})

app.get("/api/todoDb",async (req,res)=>{
    await todoModel.find()
    .then((entries)=>res.send(entries))
    .catch((e)=>console.log(e))

})

app.listen(3000,()=>{
    console.log("Server is Running")
})
