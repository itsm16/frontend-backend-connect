import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema({
    name: String
});

const todoModel = mongoose.model("todoModel",todoSchema);

export default todoModel;