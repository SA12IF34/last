import React, { useRef } from 'react'
import api from './apis/api';

const LogIn = ({addUser, csrftoken}) => {

  const username = useRef();
  const email = useRef();
  const pswrd = useRef();

  async function logIn(usrname, email, pswrd) {
    const response = await api.post('login/', {username: usrname, email: email, password: pswrd}, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken
        },
      });
    const status = await response.status;
    if (status === 200) {
        const data = await response.data;
        addUser(data.id, data.username, data.email);
        // console.log(data);
    }
  }

  return (
    <section className='LogIn full'>
        <form onSubmit={(e) => {
            e.preventDefault();
            logIn(username.current.value, email.current.value, pswrd.current.value);
        }}>
            <div>
                <label htmlFor="username"><h3>Enter The Username :</h3></label>
                <br />
                <input type="text" id='username' placeholder='saleem' ref={username} />
            </div>
            <div>
                <label htmlFor="email"><h3>Enter The Email :</h3></label>
                <br />
                <input type="email" id="email" placeholder='saleem@books.com' ref={email} />
            </div>
            <div>
                <label htmlFor="password"><h3>Enter The Password :</h3></label>
                <br />
                <input type="password" id="password" ref={pswrd} />
            </div>
            <div>
                <input type="submit" value="Submit" />
            </div>
        </form>
    </section>
  )
}

export default LogIn;