import React , {useState} from "react";
import { useNavigate  } from 'react-router-dom'
import CourseService from '../service/course.service'
function PostCourseComponent(props){
  const navigate = useNavigate()
  let {currentUser, setCurrentUser} = props
  let [title, setTitle] = useState('')
  let [description, setDescription] = useState('')
  let [price, setPrice] = useState(0)
  let [message, setMessage] = useState('')


  const handleTitle= function(e){
    setTitle(e.target.value)  
  }
  const handleDescription= function(e){
    setDescription(e.target.value)  
  }
  const handlePrice = function(e){
    setPrice(e.target.value)  
  }
  const handleToLogin = () =>{
    navigate('/login')
  }
  const handleSubmit = ()=>{
    console.log({title, description, price})
    CourseService.post(title, description, price)
      .then((res)=>{
          console.log(res)
          alert('註冊成功,導向課程頁面')
          navigate('/course')
      }).catch( error =>{
        setMessage(error.response.data)
      })
  }
  
  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      {
        !currentUser && (
          <div>
            <h3>您必須先登入才可以上傳新的課程</h3>
            <button className="btn btn-primary"
              onClick={handleToLogin}
              >返回登入</button>
          </div>
        )
      }
      {
        currentUser && currentUser.user.role !== 'instructor' &&(
          <div>
            <h2>只有講師可以開新的課程</h2>
            <button className="btn btn-primary"
                onClick={handleToLogin}
                >返回登入更換身分</button>
          </div>
        )
      }
      {
        currentUser && currentUser.user.role === 'instructor' &&(
        <div> 
            { message && (<div className="alert alert-danger">
                { message }
              </div>
            )}
          <div className="form-group mb-3">
            <label htmlFor="title">課程名稱</label>
            <input type="text" className="form-control" onChange={handleTitle} name="title" />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="description">課程描述</label>
            <input type="text" className="form-control" onChange={handleDescription} name="description" />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="price">課程價格</label>
            <input type="number" className="form-control" onChange={handlePrice} name="price" />
          </div>
          <button onClick={handleSubmit} className="btn btn-primary">
            <span>上傳課程</span>
          </button>
        </div>
        )
      }
      
    </div>
  );
};

export default PostCourseComponent;
