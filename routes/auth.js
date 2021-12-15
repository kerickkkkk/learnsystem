const router = require('express').Router();
// 引入 joi 驗證
const { loginValidation, registerValidation } = require('../validation')

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
router.post('/register', (req, res)=>{
  console.log('register');
  const {error} = registerValidation(req.body)
  if(error) res.status(400).send(error.details[0].message)

})
module.exports = router
