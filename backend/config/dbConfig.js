const mongoose = require('mongoose');

const connection = mongoose.createConnection('mongodb+srv://tamilkumaran1494:tamil2004@cluster0.o3hc8rf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').on('open',()=>{
    console.log("MongoDB connected");
}).on("error",(error)=>{
    console.error(error.message);
})

module.exports = connection;