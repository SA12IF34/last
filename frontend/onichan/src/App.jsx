import { useState, useEffect } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Home from './Home';
import SignUp from './SignUp';
import LogIn from './LogIn';
import About from './About';
import Cart from './Cart';
import Bought from './Bought';
import NotFound from './NotFound';
import Books from './Books';
import Book from './Book';
import BS from './BS';
import Success from './Success';
import './App.css';
import api from './apis/api';

/* Books API 1 */
// https://www.googleapis.com/books/v1/volumes?q=${input}&key=AIzaSyDC_qS2Su7sFIxffrkpvXJ52bFkUOoLdzQ

/* Books API 2 */
// https://www.googleapis.com/books/v1/volumes/${id}?key=AIzaSyDC_qS2Su7sFIxffrkpvXJ52bFkUOoLdzQ

/* Books API 3 "Books Covers" */
// https://books.google.com/books/publisher/content/images/frontcover/BOOKID?fife=w500-h700&source=gbs_api

function App() {

  const navigator = useNavigate();
  const [books, setBooks] = useState([]);
  const [id, setId] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  let csrftoken ;


  function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }

  csrftoken = getCookie('csrftoken');


  function alertChan(title, id, submit) {

    window.scrollTo(0, 0);
    
    let container = document.createElement("div");
    let number = document.createElement("h2");
    let btn1 = document.createElement("button");
    let btn2 = document.createElement("button");
    let alert = document.createElement("h2");

    container.id = "container";

    btn1.innerText = "Copy";
    btn2.innerText = "Cancel";

    btn1.style.cssText = "position: absolute; bottom: 25px; right: 120px;"
    btn2.style.cssText = "position: absolute; bottom: 25px; right: 30px;"

    alert.innerText = "Use The Folowing Number in order to make the operation succeeding :";
    number.innerText = 4242424242424242;
    alert.style.cssText = "margin: 25px; font-size: 1.2em";
    number.style.cssText = "position: absolute; top: 50%; transform: translateY(-50%); left: 25px;";
    

    container.style.cssText = `
      width: 80%;
      max-width: 500px;
      min-width: 350px;
      height: 260px;
      background-color: white;
      border: 1px solid black;
      border-radius: 12px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 973;
    `;

    container.append(alert, number, btn1, btn2);

    let root = document.getElementById("root");
    root.classList.add("rootAlert");
    
    document.body.appendChild(container);

    btn1.onclick = () => {
      root.classList.remove("rootAlert");
      window.navigator.clipboard.writeText("4242424242424242");
      container.remove();
      checkOut(title, id);
      submit.click();
      return 'copy';
    }

    btn2.onclick = () => {
      root.classList.remove("rootAlert");
      container.remove();
      return 0;
    }

  }


  async function handleSearch(input) {
    try {
      
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${input}&maxResults=33&key=AIzaSyDC_qS2Su7sFIxffrkpvXJ52bFkUOoLdzQ`);
      setBooks(response.data.items);
      navigator(`/ecommerce-project/search-${input}/`)

    } catch (error) {
      console.log(error);
    }
  }

  function addUser(id, name, email) {
    window.localStorage.setItem("auth", JSON.stringify({name: name, email: email, id: id}));
    window.location.assign('/ecommerce-project/');
  }

  function removeUser() {
    window.localStorage.removeItem("auth");
    window.location.assign('/ecommerce-project/');
  }



  async function addToCart(title, id) {    

    const user = JSON.parse(localStorage.getItem("auth"));

    if (user === null || user === undefined) {
      alert("You are not authenticated.")
      return 0;
      
    }
    
    const data = {owner: user['id'], 
    book_name: title, 
    book_id: id};
    console.log(data);
    const response = await api.post('cart/', data, 
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken
      },
    });
    const status = await response.status;
    const data2 = await response.data;
    console.log(data2);
    if (status === 201) {
      alert("the book is added");
      
      
    } 
    
  }
  
  async function buy() {

    const data = JSON.parse(sessionStorage.getItem("bought"));

    console.log(data);
    const response = await api.post('boughts/', {
      owner: data['owner'], 
      book_name: data['title'], 
      book_id: data['id']}, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken
        },
      });
    const status = await response.status;
    if (status === 201) {
      alert("good");
    }
  }

  async function go() {
    await api.post("checkoutchan/", '', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Credentials':true
      },
    });
  }

  async function checkOut(title, id) {

    const user = JSON.parse(localStorage.getItem("auth"));

    if (user === null || user === undefined) {
      alert("You are not authenticated.");
      return 0;
    }


    // console.log(typeof user);
    sessionStorage.setItem("bought", JSON.stringify({owner: user['id'], title: title, id: id}));

     
    ;


  }


  return (
    <>
      <Header handleSearch={handleSearch} removeUser={removeUser} csrftoken={csrftoken} />
      <Routes>
          <Route path='ecommerce-project/' element={<Home setId={setId} />} />
          <Route path='ecommerce-project/about/' element={<About />} />
          <Route path='ecommerce-project/signup/' element={<SignUp addUser={addUser} csrftoken={csrftoken} />} />
          <Route path='ecommerce-project/login/' element={<LogIn addUser={addUser} csrftoken={csrftoken} />} />
          <Route path='ecommerce-project/cart/' element={<Cart checkOut={checkOut} csrftoken={csrftoken} alertChan={alertChan} />} />
          <Route path='ecommerce-project/bought/' element={<Bought />} />
          <Route path='ecommerce-project/search-:name' element={<Books 
                                                books={books} 
                                                navigator={navigator}
                                                setId={setId}
                                                setTitle={setTitle}
                                                setDescription={setDescription} />} />
          <Route path='ecommerce-project/book-:name/' element={<Book 
                                                                    id={id} 
                                                                    title={title} 
                                                                    setTitle={setTitle} 
                                                                    description={description}
                                                                    checkOut={checkOut}
                                                                    addToCart={addToCart}
                                                                    csrftoken={csrftoken}
                                                                    alertChan={alertChan} />} 
                                                                     />
          <Route path='ecommerce-project/bs-:name/' element={<BS addToCart={addToCart} id={id} checkOut={checkOut} csrftoken={csrftoken} alertChan={alertChan} />} />
          <Route path='ecommerce-project/success/' element={<Success buy={buy} />} />
          <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App;
