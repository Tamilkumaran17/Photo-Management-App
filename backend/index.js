const app = require('./app');
require('./config/dbConfig');
const cloudinary = require('cloudinary').v2


cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_key,
    api_secret:process.env.CLOUDINARY_API_SECRET
});

app.listen(3001,()=>{
    console.log("server run in http://localhost:3001");
})