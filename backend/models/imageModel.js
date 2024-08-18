const mongoose = require('mongoose');
const db = require('../config/dbConfig');
const uuidv4 = require('uuid').v4;

const ImageSchame = new mongoose.Schema({
    id:{
        type:String,
        default: uuidv4,
    },
    public_id:{
        type:String,
        required:true
    },
    imageURL:{
        type:String,
        require:true
    },
    title:{
        type:String
    },
    description:{
        type:String
    },
    date : {
        type:Date,
        default:(new Date().toISOString())
    }
});

module.exports = db.model('images',ImageSchame);