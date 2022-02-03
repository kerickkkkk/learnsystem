import React , {useState} from "react";
import { useNavigate  } from 'react-router-dom'
import AuthService from '../service/auth.service'
function RegisterComponent(props){
  const navigate = useNavigate()
  let { setCurrentUser } = props
  
  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')
  let [message, setMessage] = useState('')

  
  const handleEmail = function(e){
    setEmail(e.target.value)  
  }
  const handlePassword = function(e){
    setPassword(e.target.value)  
  }


  const handleSubmit = ()=>{
    AuthService.login(email, password)
      .then((response) => {
        if(response.data.token){
          localStorage.setItem('learning_user', JSON.stringify(response.data) )
          setCurrentUser(response.data)
        }
        navigate('/profile')
      }).catch( error =>{
        setMessage(error.response.data)
      })
  }
  
  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      <div>
        <h2>登入頁面</h2>
          {/* 錯誤訊息 */}
          { message && (<div className="alert alert-danger">
              { message }
            </div>
          )}
        <div className="form-group">
          <label htmlFor="email">信箱</label>
          <input type="text" className="form-control" onChange={handleEmail} value={email} name="email" />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">密碼</label>
          <input type="password" className="form-control" onChange={handlePassword} value={password} name="password" />
        </div>
        <br />
        <button onClick={handleSubmit} className="btn btn-primary">
          <span>登入</span>
        </button>
      </div>
    </div>
  );
};

export default RegisterComponent;
