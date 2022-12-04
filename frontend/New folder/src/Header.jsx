import React, {useRef, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import api from './apis/api';

const Header = ({handleSearch, removeUser, csrftoken}) => {

  const searchRef = useRef();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const something = localStorage.getItem("auth");
    if (something) {
        setIsAuth(true);
    } else {
        setIsAuth(false);
    }
  }, []);

  async function logOut() {
    const response = await api.post('logout/', {}, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken
        },
      });
    const status = await response.status;
    if (status === 202) {
        removeUser();
    }
  } 


  return (
    <>
    <header className='head'>
        <h1><Link to={"/ecommerce-project/"}>Books</Link></h1>
        <div className='SearchBar'>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSearch(searchRef.current.value)             
            }}>
                <input type="text" id="search" ref={searchRef} />  
                <button type='submit'><i class="fa-solid fa-magnifying-glass"></i></button>
            </form>
        </div>
    </header>
    <div id="subheader" className='head'>
        <div className='Auth'>
            <ul>
                {!isAuth ? 
                (<>
                    <li><Link to={'/ecommerce-project/signup/'}>SignUp</Link></li>
                    <li><Link to={'/ecommerce-project/login/'}>LogIn</Link></li>

                </>) : (<li onClick={() => {logOut()}}>LogOut</li>) }
                <li><Link to={'/ecommerce-project/about/'}>About</Link></li>
            </ul>
        </div>
        <div className='Things'>
            <ul>
                <li>
                    <Link to={'/ecommerce-project/bought/'}>
                        <i class="fa-solid fa-bag-shopping"></i>
                        <i class="fa-solid fa-check ok"></i>
                    </Link>
                </li>
                <li>
                    <Link to={'/ecommerce-project/cart/'}><i className="fa-solid fa-cart-shopping"></i></Link>
                </li>
            </ul>
        </div>
    </div>
    </>
  )
}

export default Header;