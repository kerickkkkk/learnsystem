import React , {useState, useEffect} from 'react'
import { Routes, Route } from "react-router-dom";
import HomeComponent from './components/home-component'
import NavComponent from './components/nav-component'
import RegisterComponent from './components/register-component';
import LoginComponent from './components/login-component';
import ProfileComponent from './components/profile-component';
import CourseComponent from './components/course-component';
import AuthService from './service/auth.service'

function App(){
  let [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser())
  useEffect(() => {
    setCurrentUser(AuthService.getCurrentUser())
  }, [])

  return (
    <div>
      <NavComponent currentUser ={currentUser}/>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/register" element={<RegisterComponent />} />
        <Route path="/login" element={<LoginComponent  setCurrentUser = {setCurrentUser}/>} />
        <Route path="/profile" element={<ProfileComponent currentUser ={currentUser}/>} />
        <Route path="/course" element={<CourseComponent  setCurrentUser = {setCurrentUser} currentUser ={currentUser}/>} />
      </Routes>
    </div>
  )
}

export default App;
