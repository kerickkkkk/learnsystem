// rafc
import React, {useEffect, useState} from 'react'
import { useNavigate  } from 'react-router-dom'
import CourseService from '../service/course.service'
function CourseComponent(props) {
  const navigate = useNavigate()
  const {currentUser, setCurrentUser} = props
  let [courseData, setCourseData] = useState(null)

  const goToLogin = () => {
    navigate('/login')
  }
  useEffect(()=>{
    let _id;
    if(currentUser){
      _id = currentUser.user._id
    }else{
      _id = ''
    }
    if(currentUser.user.role === 'instructor'){
      CourseService.getInstructorCourse(_id)
        .then(({data})=>{
          setCourseData(data)
        }).catch((err)=>{
          console.log(err);
        })
    }else if(currentUser.user.role === 'student'){
      CourseService.getEnrollCourse(_id)
        .then((data)=>{
          console.log('student',{data})
          setCourseData(data.data)
        })
        .catch((err)=>{
          console.log(err);
        })
    }

  },[])


  return (
    <div>
      {/* 沒有登入狀態 */}
      {
        !currentUser && <div className="m-5 h3">
          敬啟者，沒有登入狀態 <br />
          <button onClick={goToLogin} className="btn btn-primary btn-lg">登入由此去</button>
        </div>
      }
      {/* 教師 */}
      {
        currentUser && currentUser.user.role === 'instructor' && <div className="p-5">
          講師：{currentUser.user.username} ，您好:
        </div>
      }
      {/* 學生 */}
      {
        currentUser && currentUser.user.role === 'student' && <div className="p-5">
          學生您好
        </div>
      }
      {
        courseData && courseData.length > 0 &&(
          <div>
            {
              courseData.map(course => 
                <div className="card" style={{ width: "18rem" }} key={course._id}>
                  <div className="card-body">
                    <h5 className="card-title">{course.title}</h5>
                    <p className="card-text">{course.description}</p>
                    註冊數 : {course.students.length} 人
                    課程價格：{course.price}
                  </div>
                </div>
              )
            }
          </div>
        )
      }
    </div>

    
  )
}

export default CourseComponent
