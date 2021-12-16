const router = require('express').Router();
const Course = require('../models/course-model')
const { courseValidation } = require('../validation')

router.use((req, res, next)=>{
  console.log('一個請求進入 course route');
  next()
})


router.post('/', async (req,res)=>{
  console.log('enter course route');
  const { error } = courseValidation(req.body)
  
  let {title, description, price} = req.body
  if(error) {
    return res.status(400).send(error.details[0].message)
  }
  // 確認身分
  if(req.user.isStudent()){
    return res.status(400).send('只有講者 可以開新的課程')
  }


  let newCourse = new Course({
    title, description, price
  })

  try{
    await newCourse.save()
    res.status(200).send('新課程成功被儲存')
  }catch(err){
    res.status(400).send('無法存課程')
  }
})


module.exports = router