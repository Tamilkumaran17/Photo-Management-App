const mongoose = require('mongoose');

const connection = mongoose.createConnection('mongodb://localhost:27017/galary').on('open',()=>{
    console.log("MongoDB connected");
}).on("error",(error)=>{
    console.error(error.message);
})

module.exports = connection;