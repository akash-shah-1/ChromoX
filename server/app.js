const express =  require('express')
require('dotenv').config();
const PORT = process.env.PORT || 4000;
const app = express();
const mongoose = require('./config/mongoose')
const cors = require('cors')

app.use(cors());
app.use(express.json());

app.use(require('./routes/v1/index'))


app.listen(PORT,(err)=>{
    if(err){
        console.log(`Error in listening port ${PORT} ${err}`)
    }
    else{
        console.log(`Sever is started at ${PORT}`)
    }
})
