import React, {useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import api from "./api/api";


const LogIn = ({csrftoken, loggedIn}) => {

  const navigator = useNavigate();

  const username = useRef();
  const email = useRef();
  const password = useRef();

  

  async function handleLogIn() {
    const response = await api.post('apis/login/', {
      username: username.current.value, 
      email: email.current.value,
      password: password.current.value
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken
      }
    });

    const status = await response.status;

    if (status === 200) {
      loggedIn(username.current.value)
    }    
  }

  return (
    <div className='LogIn'>
      <form className='AccountForm' action="" onSubmit={(e) => {
        e.preventDefault();
        handleLogIn()
      }}>
        
        <label htmlFor="usename">Your Usename :</label><br />
        <input type="text" id='username' ref={username} /><br /><br />
        
        <label htmlFor="email">Your Email :</label><br />
        <input type="email" name="email" id="email" ref={email} /><br /><br />
        
        <label htmlFor="password">Your Password :</label><br />
        <input type="password" name="password" id="password" ref={password} /><br /><br />

        <input type="submit" value="Submit" />

      </form>
    </div>
  )
}

export default LogIn;