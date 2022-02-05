import React,{useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import CourseService from '../service/course.service';


const EnrollCourseComponent = (props) => {
  const navigate = useNavigate()
  let {currentUser} = props
  let [courseData, setCourseData] = useState(null) 
  let [searchText, setSearchText] = useState('') 

  useEffect(()=>{
    console.log('enroll course useEffect');
    CourseService.getAllCourses()
      .then((data)=>{
        setCourseData(data.data)
      })
  },[])

  const handleChangeSearchText = (e) =>{
    setSearchText(e.target.value)
  }

  const goToLogin = () => {
    navigate('/login')
  }

  const searchCourse = () =>{ 
    CourseService.searchCourse(searchText)
      .then((data)=>{
        setCourseData(data.data)
      })
      .catch(err=> console.log(err))
  }

  const enrollCourse = (e) =>{
    const _id = e.target.dataset['_id']
    const student_id = e.target.dataset.student_id
    CourseService.enrollCourse(_id,student_id)
      .then(data=>{
        console.log(data)
      }).catch((err) => console.log(err))
  }

  return (
    <div className="container">
    
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
          老師您好
        </div>
      }
      {
        courseData && courseData.length > 0 &&(

          <div className="row">
            <div className="input-group mb-3">
              <input onChange={handleChangeSearchText} type="text" className="form-control" placeholder="請輸入關鍵字"/>
              <button onClick={searchCourse} className="btn btn-outline-primary" type="button">搜尋</button>
            </div>
            {
              courseData.map(course => 
                <div className="col-md-4 text-center" key={course._id}>
                  <div className="card mb-3" style={{ width: "18rem" }}>
                    <div className="card-body">
                      <h5 className="card-title">{course.title}</h5>
                      <p className="card-text">{course.description}</p>

                      註冊數 : {course.students.length} 人
                      <br />
                      課程價格：{course.price}
                      <br />
                      講師:{course.instructor.username}
                      <br />
                      {
                        course.students.find(ele=>ele === currentUser.user._id) 
                          ?  (<button className="btn btn-primary" disabled="disabled">已註冊</button>) 
                          :  (<button data-_id={course['_id']} data-student_id={currentUser.user._id} onClick={enrollCourse} className="btn btn-primary">註冊課程</button>)
                      }
                      
                    </div>
                  </div>
              </div>

              )
            }
          </div>
        )
      }
    </div>
  );
};

export default EnrollCourseComponent;
