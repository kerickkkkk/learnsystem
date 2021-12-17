const router = require('express').Router();
const Course = require('../models/course-model')
const { courseValidation } = require('../validation')

router.use((req, res, next)=>{
  console.log('一個請求進入 course route');
  next()
})
// 取得 該身分所有課程
router.get('/', async (req, res) =>{
  Course.find({})
    // 利用關聯 objId 找課程
    .populate('instructor', ['username','email'])
    .then((course)=>{
      res.send(course)
    }).catch(()=>{
      res.status(500).send('沒有找到課程')
    })
})

// 新增課程
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
    title, description, price, 
    instructor: req.user._id
  })

  try{
    await newCourse.save()
    res.status(200).send('新課程成功被儲存')
  }catch(err){
    res.status(400).send('無法存課程')
  }
})

// 找單一堂
router.get('/:_id', (req, res)=>{
  let { _id } = req.params
  Course.findOne({ _id })
    .populate('instructor',['email'] )
    .then((course)=>{
      res.send(course)
    }).catch( e => res.send(e))
})

// 更新

router.patch('/:_id', async (req,res)=>{
  const { error } = courseValidation(req.body)
  
  if(error) {
    return res.status(400).send(error.details[0].message)
  }
  let { _id } = req.params

  let course = await Course.findOne({_id})
  if(!course){
    res.status(404)
    return res.json({
      success : false,
      message : '課程不存在' 
    })
  }

  // 判斷 課程和使用者是否相同
  if(course.instructor.equals(req.user._id) || req.user.isAdmin()){
    Course.findOneAndUpdate({ _id }, req.body, {
      new: true,
      runValidators: true
    }).then(()=>{
      res.send('課程已更新')
    }).catch( e =>{
      res.send({
        success: false,
        message : e
      })
    })
  }else{
    res.status(403)
    return res.json({
      success: false,
      message : '只有課程擁有者與管理者可以更改課程'
    })
  }

})

module.exports = router