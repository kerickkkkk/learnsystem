// rafc
import React from 'react'
import { useNavigate  } from 'react-router-dom'
function CourseComponent(props) {
  const navigate = useNavigate()
  const {currentUser, setCurrentUser} = props

  const goToLogin = () => {
    navigate('/login')
  }

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
          老師您好
        </div>
      }
      {/* 學生 */}
      {
        currentUser && currentUser.user.role === 'student' && <div className="p-5">
          老師您好
        </div>
      }
    </div>

    
  )
}

export default CourseComponent
