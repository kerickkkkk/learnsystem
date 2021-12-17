const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
// router
const authRoute = require('./routes').auth
const courseRoute = require('./routes').course
const passport = require('passport')
require('./config/passport')(passport)
const cors = require('cors')

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
// 放在 route 上面
app.use(cors())

// 一定要加 /api 和前端接會很方便
app.use('/api/user', authRoute)
// 需初始化
app.use(passport.initialize())
// 需要登入則要先驗證用 jwt 
app.use('/api/courses', passport.authenticate('jwt', {session: false}), courseRoute)

const port = 8080

app.listen( port, ()=>{
  console.log(`Server 已經在 port :${port} 運行`);
})