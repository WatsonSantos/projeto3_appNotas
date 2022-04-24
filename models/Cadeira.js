const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Cadeira = new Schema({
    nome:{
        type: String,
        required: true
    },
    teste1:{
        type: Number,
        required: true
    },
    teste2:{
        type: Number,
        required: true
    },
    trabalho1:{
        type: Number,
        required: true
    },
    trabalho2:{
        type: Number,
        required: true
    },
    date:{
        type: Date,
        default: Date.now()
    }
})

mongoose.model("cadeiras", Cadeira)