import React from "react";
import { Link } from 'react-router-dom'
function ProfileComponent(props){
  let { currentUser }= props

  return (
    <div>
      {
        !currentUser &&(
          <div>
            <h1>沒有登入狀態</h1>
            <Link className="btn btn-outline-primary" to="/">
              返回首頁
            </Link>
          </div>
        )
      }
      {
        currentUser && (
          <div>
            <h1> {currentUser.user.username} 您好:</h1>
            <p>您的 JWT : {currentUser.token}</p>
            <p>
              您的 email: {currentUser.user.email}
            </p>
          </div>
        )
      }
    </div>
  );
};

export default ProfileComponent;
