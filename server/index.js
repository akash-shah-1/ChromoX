const express =  require('express')
require('dotenv').config();
const PORT = process.env.PORT || 4000;
const app = express();
const mongoose = require('./config/mongoose')

app.use(express.json());


app.listen(PORT,(err)=>{
    if(err){
        console.log(`Error in listening port ${PORT} ${err}`)
    }
    else{
        console.log(`Sever is started at ${PORT}`)
    }
})
