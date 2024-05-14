import express from 'express'
import cors from 'cors'

const app = express();

// Middlewares
app.use(cors());

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

app.get("/api/tasks",(req,res)=>{
    res.send(tasks)
})

app.listen(3000,()=>{
    console.log("Server is Running")
})