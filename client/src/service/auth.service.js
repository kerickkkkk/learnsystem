import axios from 'axios'
const API_URL = `${process.env.REACT_APP_API_ENDPOINT}/user`

class AuthService {
  login(email, password){
    return axios.post(API_URL + '/login', {
      email, password
    })
  }
  logout(){
    localStorage.removeItem('learning_user')
  }
  register(username, email, password, role){
    return axios.post(API_URL + '/register', {
      username, email, password, role
    })

  }
  getCurrentUser(){
    return JSON.parse(localStorage.getItem('learning_user'))
  }
  
}


export default new AuthService()
