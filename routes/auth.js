const router = require('express').Router();


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

module.exports = router
