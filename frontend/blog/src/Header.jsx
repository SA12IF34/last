import React from 'react'
import {Link} from 'react-router-dom';
import api from './api/api';

const Header = ({logOut, searchValue, setSearchValue}) => {

  let something ;

  if (localStorage.getItem("auth")) {
    something = JSON.parse(localStorage.getItem("auth"));
  } else {
    something = {logged : false};
  }

    

  
  

  return (
    <>
      <header className="Header">
        <Link to={'/blog/'} ><h1>My Blog</h1></Link>
       
        
        <div className='Search'>
            <input type="text" name="search" id="search" onChange={(e) => {
              setSearchValue(e.target.value);              
            }} />
            <button><i class="fa-solid fa-magnifying-glass"></i></button>
        </div>
      </header>
      <div className='SecondHeader'>
        <div>
          {something.logged ? (
            <>
              <Link onClick={() => {logOut()}} to={'/blog/'}><h3 style={{cursor: 'pointer'}} >LogOut</h3></Link>
              
            </>
          ) : (
            <>
              <ul>
                <li><Link to={'/blog/login/'}><h3>LogIn</h3></Link></li>
                <li><Link to={'/blog/signup/'}><h3>SignUp</h3></Link></li>
              </ul>
            </>
          )}
          {something.logged && something.subscribed || something.username === "saif" ? (
            <>
              <div>
                <Link to={'/blog/profile/'}><i class="fa-solid fa-user"></i></Link>
                <Link to={'/blog/post/'}><i class="fa-regular fa-pen-to-square"></i></Link>
              </div>
            </>
          ) : (
          <>
            <Link to={'/blog/subscribe/'}><h3>Subscribe</h3></Link>
          </>)}
        </div>
        
      </div>
    </>
  )
}

export default Header;  