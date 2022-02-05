import axios from 'axios'
const API_URL = `${process.env.REACT_APP_API_ENDPOINT}/courses`

class CourseService {
  getAllCourses(){
    let token = localStorage.getItem('learning_user') 
    ? JSON.parse(localStorage.getItem('learning_user')).token 
    : ''

    return axios.get(`${API_URL}`,
      {
        headers:{
          Authorization: token
        }
      }
    )
  }
  post(title, description, price){
    let token = localStorage.getItem('learning_user') 
      ? JSON.parse(localStorage.getItem('learning_user')).token 
      : ''
    return axios.post(API_URL, 
        {title, description, price},
        {
          headers:{
            Authorization: token
          }
        }
      )
  }
  get(_id){
    let token = localStorage.getItem('learning_user') 
      ? JSON.parse(localStorage.getItem('learning_user')).token 
      : ''

    return axios.get(`${API_URL}/instructor/${_id}`,
      {
        headers:{
          Authorization: token
        }
      }
    )


  }
  getInstructorCourse(_instructor_id){
    let token = localStorage.getItem('learning_user') 
    ? JSON.parse(localStorage.getItem('learning_user')).token 
    : ''
    return axios.get(`${API_URL}/instructor/${_instructor_id}`,
      {
        headers:{
          Authorization: token
        }
      }
    )
  }
  getEnrollCourse(_id){
    let token = localStorage.getItem('learning_user') 
    ? JSON.parse(localStorage.getItem('learning_user')).token 
    : ''
    console.log('getEnrollCourse',`${API_URL}/student/${_id}`,{_id})
    return axios.get(`${API_URL}/student/${_id}`,
      {
        headers:{
          Authorization: token
        }
      }
    )
  }
  enrollCourse( _id, student_id ){
    let token = localStorage.getItem('learning_user') 
    ? JSON.parse(localStorage.getItem('learning_user')).token 
    : ''

    return axios.post(`${API_URL}/enroll-course`,
      {_id, student_id},
      {
        headers:{
          Authorization:token
        }
      }
    )
  }
  searchCourse(searchText){
    let token = localStorage.getItem('learning_user') 
    ? JSON.parse(localStorage.getItem('learning_user')).token 
    : ''

    return axios.post(`${API_URL}/search-course/`,
      {searchText},
      {
        headers:{
          Authorization:token
        }
      }
    )
      
  }
}


export default new CourseService()
