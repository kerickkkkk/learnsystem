import axios from 'axios'
const API_URL = `${process.env.REACT_APP_API_ENDPOINT}/courses`

class CourseService {
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
}


export default new CourseService()
