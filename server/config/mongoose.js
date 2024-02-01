const mongoose = require('mongoose')
const URL = process.env.Mongo_URL


mongoose.connect(URL).then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log("Error in connecting to MongoDB",err);
})

