const router = require('express').Router();
// 引入 joi 驗證
const { loginValidation, registerValidation } = require('../validation')
const User = require('../models/index').userModel
const jwt = require('jsonwebtoken')


router.use((req, res, next)=>{
  console.log('有一個 request 進到 auth.js');
  next()
})


router.get('/testAPI', (req, res)=>{
  const msgObj = {
    message: "Test API is working."
  }
  return res.json(msgObj)
})

// joi/register
router.post('/register', async (req, res)=>{
  console.log('register');
  // validation
  const {error} = registerValidation(req.body)
  if(error) res.status(400).send(error.details[0].message)


  const userIsExist = await User.findOne({email: req.body.email})

  if(userIsExist) {
    return res.status(400).send('使用者已經存在')
  }

  const {username, email, password, role} = req.body

  const newUser = new User({
    username, email, password, role
  })
  
  try{
    // 可以看一下 User 有 pre save處理密碼
    const saveUser = await newUser.save()
    res.status(200).send({
      msg: '儲存成功',
      savedObject: saveUser
    })

  }catch(err){
    res.status(400).send('儲存失敗')
  }

})

// login
router.post('/login', (req, res) => {
  // validation 資料
  const { error } = loginValidation(req.body)
  if(error) res.status(400).send(error.details[0].message)

  User.findOne({email: req.body.email}, function(err, user){
    if(err){
      res.status(400).send(err)
    }
    if(!user){
      res.status(401).send('使用者不存在')
    }else{
      user.comparePassword(req.body.password, function(err, isMatch){
        if(err) return res.status(400).send(err)
        if(isMatch){
          const tokenObject = {_id: user.id, email: user.email}
          const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET)
          res.send({success: true, token:`JWT ${token}`, user})
        }else{
          res.status(401).send('密碼錯誤')
        }
      })
    }
  })

})


module.exports = router
