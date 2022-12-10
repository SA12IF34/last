import React, {useState} from 'react';
import api from './api/api';


const SignUp = ({csrftoken, loggedIn}) => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  function fillValue(target, setter) {
    setter(target.value);
  }

  async function handleSubmit() {
    if (password1 === password2) {
      const response = await api.post('apis/add-user/', {
        username: username, 
        email: email, 
        password: password1 }, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
          }
        });

      loggedIn(username);      
    } else {
      alert("The Passwords Don't Match.");
    }
  }

  return (
    <div className='SignUp'>
      <form className='AccountForm' onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}>
        <label htmlFor="username">Username :</label><br />
        <input type="text" name="username" id="username" onChange={(e) => {fillValue(e.target, setUsername)}} /><br/><br />

        <label htmlFor="email">Email :</label><br />
        <input type="email" name="email" id="email" onChange={(e) => {fillValue(e.target, setEmail)}}/><br/><br />

        <div style={{display: 'flex', flexWrap: 'wrap'}}>
          <div style={{margin: '10px'}}>
            <label htmlFor="password1">Password :</label><br />
            <input type="password" name="password1" id="password1" onChange={(e) => {fillValue(e.target, setPassword1)}} />
          </div>
          <div style={{margin: '10px'}}>
            <label htmlFor="password2">Repeat Password :</label><br />
            <input type="password" name="password2" id="password2" onChange={(e) => {fillValue(e.target, setPassword2)}} />
          </div>
        </div>

        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default SignUp;