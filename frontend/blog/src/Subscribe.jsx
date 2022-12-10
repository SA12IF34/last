import React, {useRef, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api/api';

//  first
//  second

const Subscribe = ({csrftoken, load, loggedIn}) => {

  let first = `<i class="fa-solid fa-eye"></i>`;
  let second = `<i class="fa-solid fa-eye-slash"></i>`;
  
  const nameRef = useRef();
  const emailRef = useRef();
  const reasoneRef = useRef();
  const passwordRef = useRef();
  const navigator = useNavigate();
  let user;
  const headersChan = {headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-CSRFToken': csrftoken
  }}

  if (localStorage.getItem("auth") === null) {
    user = ({logged: false, hasAccount: false});
  } else {
    user = JSON.parse(localStorage.getItem("auth"));
  }


  async function handleSubmit() {
    load();
    let onichan = document.querySelector(".Load");
    let rootChan = document.getElementById("root");

    if (user.logged) {

      const response = await api.post("saifapis/subscribe/", {
        name: user.username,
        email: emailRef.current.value,
        reasone: reasoneRef.current.value
        }, headersChan);
      
      window.location.assign('/blog/request-sent/');

    } else {

      await api.post("saifapis/subscribe/", {
        name: nameRef.current.value,
        email: emailRef.current.value,
        reasone: reasoneRef.current.value
        }, headersChan);
      
      handleSubmit2();
    }
    
    
    
    onichan.remove();
    rootChan.classList.toggle("loadState");
    
  }
  
  function changeState() {
    
    let parent = document.querySelector('.state');
    let input = document.querySelector('.password');
    let icon = parent.firstElementChild;

    switch (icon.classList[icon.classList.length-1]) {
      case "fa-eye":
        input.type = "text";
        parent.innerHTML = second;
        
        break;
      
      case "fa-eye-slash":
        input.type = "password";
        parent.innerHTML = first;
        break;

      default:
        break;
  }}

  async function handleSubmit2() {
    
    if (user.hasAccount) {
      await api.post('apis/login/', {
        username: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value
      }, headersChan);

    } else {
      await api.post('apis/add-user/', {
        username: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value
      }, headersChan);
    }
    
    loggedIn(nameRef.current.value, true);
    
  }

  return (
    <div style={{padding: '20px'}} className='Subscribe'>
      <form className='AccountForm' onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }} >
        {user.hasAccount ? (
          <>
            <h2 style={{color: 'deepskyblue', margin: '10px'}}>It seems like you had an account here, so please use it</h2>
          </>
        ) : (<></>)}
        {!user.logged ? (
          <>
            <label htmlFor="name">Your Name :</label><br />
            <input type="text" id='name' ref={nameRef} />
            <br /><br />
          </>
        ) : (<></>)}
        <label htmlFor="email">Your Email : | Use Real Email |</label><br />
        <input type="email" id='email' ref={emailRef} />
        <br /><br />
        {!user.logged ? (
          <>
            <label htmlFor="password">Your Password :</label><br />
            <input type="password" id="password" className='password' ref={passwordRef} />
            <button className='state' onClick={(e) => {
              e.preventDefault();
              changeState()
            }} style={{marginLeft: "10px"}}><i class="fa-solid fa-eye"></i></button>
            <br /><br />
          </>
        ) : (<></>)}
        <label htmlFor="reasone">Explain Why Would I Give You The Ability To Write Blogs :</label><br />
        <textarea name="" id="reasone" ref={reasoneRef} ></textarea>
        <br /><br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default Subscribe;