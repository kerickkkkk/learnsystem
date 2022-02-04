import React  from 'react'
import { Link , useNavigate} from 'react-router-dom'
import AuthService from '../service/auth.service'
function  NavComponent(props){
  let { currentUser,setCurrentUser } = props

  const navigate = useNavigate()
  const handleLogout = () =>{
    AuthService.logout()
    alert('您已登出，重新導向登入頁面!!!')
    setCurrentUser(null)
    navigate('/login')
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  Home
                </Link>
              </li>
              {
                !currentUser && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                )
              }
              {
                !currentUser && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                )
              }
              {
                currentUser && (
                  <li className="nav-item">
                    <Link onClick={handleLogout} className="nav-link" to="/">
                      Logout
                    </Link>
                  </li>
                )
              }
              {
                currentUser && (
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    Profile
                  </Link>
                </li>
                )
              }
              {
                currentUser && (
                <li className="nav-item">
                  <Link className="nav-link" to="/course">
                    課程
                  </Link>
                </li>
                )
              }
              {
                currentUser && currentUser.user.role === 'instructor' && (
                <li className="nav-item">
                  <Link className="nav-link" to="/post-course">
                    新增課程
                  </Link>
                </li>
                )
              }


            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavComponent
