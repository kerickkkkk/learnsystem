import React , {useState} from "react";
import { useNavigate  } from 'react-router-dom'
import AuthService from '../service/auth.service'
function RegisterComponent(){
  const navigate = useNavigate()
  let [username, setUsername] = useState('')
  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')
  let [role, setRole] = useState('')
  let [message, setMessage] = useState('')


  const handleUsername= function(e){
    setUsername(e.target.value)  
  }
  const handleEmail = function(e){
    setEmail(e.target.value)  
  }
  const handlePassword = function(e){
    setPassword(e.target.value)  
  }
  const handleRole = function(e){
    setRole(e.target.value)  
  }

  const handleSubmit = ()=>{
    console.log({username, email, password, role});
    AuthService.register(username, email, password, role)
      .then(()=>{
          alert('註冊成功')
          navigate('/login')
      }).catch( error =>{
        setMessage(error.response.data)
      })
  }
  
  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      <div>
          { message && (<div className="alert alert-danger">
              { message }
            </div>
          )}
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" className="form-control" onChange={handleUsername} name="username" />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="email">email</label>
          <input type="text" className="form-control" onChange={handleEmail} name="email" />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" onChange={handlePassword} name="password" />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="role">role</label>
          {/* <input type="text" className="form-control" onChange={handleRole} name="role" /> */}
          <select onChange={handleRole} name="role" id="role" className="form-control">
            <option value="student">student</option>
            <option value="admin">admin</option>
            <option value="instructor">instructor</option>
          </select>
        </div>
        <br />
        <button onClick={handleSubmit} className="btn btn-primary">
          <span>Register</span>
        </button>
      </div>
    </div>
  );
};

export default RegisterComponent;
