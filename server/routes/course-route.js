const router = require('express').Router();
const Course = require('../models/course-model')
const { courseValidation } = require('../validation')

router.use((req, res, next)=>{
  console.log('一個請求進入 course route');
  next()
})
// 取得 該所有課程包含講師資料
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

// 學生取得自己有註冊的課程
router.get('/student/:_student_id', (req,res)=>{
  const {_student_id} = req.params
  console.log({_student_id})
  // 找到 students[] 可以用這個方式找到
  Course.find({students: _student_id})
    .populate('instructor',[
      'username',
      'email'
    ])
    .then((courses)=>{
      res.status(200).send(courses)
    })
    .catch(()=>{
      res.status(500).send('該學生沒有註冊課程')
    })
})

// 註冊課程
//**************** 32.11*/
router.post('/enroll-course/', async(req,res) =>{
  const { _id, student_id} = req.body
  Course.findOne({_id}).then((course)=>{
    course.students.push(student_id)
    course.save()
  }).catch((err)=>{
    res.status(500).send('課程有誤')
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

// 查詢講師的課程
router.get('/instructor/:_instructor_id', (req,res)=>{
  let { _instructor_id } = req.params
  Course.find({instructor : _instructor_id})
    .populate('instructor',[
      'username',
      'email'
    ])
    .then((data)=>{
      res.send(data)
    }).catch(()=>{
      res.status(500).send('無法取得課程資訊')
    })
})
// 用搜尋標題找課程
router.post('/search-course/',(req, res)=>{
  const {searchText} = req.body
  console.log({searchText},'be')
  const searchCondition = searchText !== '' ? {title: {'$regex': searchText, '$options': 'i'} } : {}

  Course.find(searchCondition)
    .then((courses)=>{
      res.status(200).send(courses)
    })
    .catch(()=>{
      res.status(500).send('查無此課程')
    })
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