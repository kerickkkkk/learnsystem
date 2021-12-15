const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()


console.log(123)

// 連接到 DB 
mongoose
  .connect(process.env.DB_CONNECT,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(()=>{
    console.log('連線到 Mongo Altas');
  })
  .catch((e)=>{
    console.log(e);
  })

// middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const port = 8080

app.listen( port, ()=>{
  console.log(`Server 已經在 port :${port} 運行`);
})