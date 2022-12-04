import React, {useRef} from 'react';
import api from './apis/api';

const SignUp = ({addUser, csrftoken}) => {

    const username = useRef();
    const email = useRef();
    const pswrd1 = useRef();
    const pswrd2 = useRef();

    async function signUp(username, email, pswrd) {
        console.log(csrftoken);
        const response = await api.post("add-user/", {username: username, email: email, password: pswrd}, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'X-CSRFToken': csrftoken
            },
          });
        const status = await response.status;
        const data = await response.data;
        if (status === 201) {
            addUser(data.id, data.username, data.email);
        }
    }


  return (
    <section className='SignUp full'>
        <form onSubmit={(e) => {
            e.preventDefault();
            if (pswrd1.current.value === pswrd2.current.value) {
                signUp(username.current.value, email.current.value, pswrd1.current.value);
            } else {
                alert("The Passwords Does Not Match..");
            }
        }}>
            <div>
                <label htmlFor="username"><h3>Enter The Username :</h3></label>
                <br />
                <input type="text" id="username" placeholder='john' ref={username} />
            </div>
            <div>
                <label htmlFor="email"><h3>Enter The Email :</h3></label>
                <br />
                <input type="email" id="email" placeholder='john@gmail.com' ref={email} />
            </div>
            <div className='passwords'>
                <div>
                    <label htmlFor="password1"><h3>Enter The Password :</h3></label>
                    <br />
                    <input type="password" id="password1" ref={pswrd1} />
                </div>
                <div>
                    <label htmlFor="password2"><h3>Repeat The Password :</h3></label>
                    <br />
                    <input type="password" id="password2" ref={pswrd2} />
                </div>
            </div>
            <div>
                <input type="submit" value="Submit" />
            </div>
        </form>
    </section>
  )
}

export default SignUp;