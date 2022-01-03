const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const dataBase = new Schema({
    todo: {
        type: String,
        required: true, 
    }
})

const todo = mongoose.model('todo',dataBase)
module.exports= todo;