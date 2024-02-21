const express =  require('express')
require('dotenv').config();
const PORT = process.env.PORT || 4000;
const app = express();
const mongoose = require('./config/mongoose')
const cors = require('cors')

app.use(cors());
app.use(express.json());

// Add CORS headers middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow the HTTP methods you need
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // Allow the headers you need
    next();
});

app.use(require('./routes/v1/index'))


app.listen(PORT,(err)=>{
    if(err){
        console.log(`Error in listening port ${PORT} ${err}`)
    }
    else{
        console.log(`Sever is started at ${PORT}`)
    }
})
