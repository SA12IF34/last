import { useState, useEffect } from 'react';
import {Routes, Route} from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Post from './Post';
import Article from './Article';
import Missing from './Missing';
import SignUp from './SignUp';
import LogIn from './LogIn';
import Subscribe from './Subscribe';
import RequestSent from './RequestSent';
import Profile from './Profile';
import './App.css';
import api from './api/api';


function App() {

  const stringChan = "Hello I'm A Cute String";
  const [searchValue, setSearchValue] = useState("");
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    let length = searchValue.length;
    let start = 0;
    let end = length;
    function searchChan(str, start, end) {
      if (str.slice(start, end) === searchValue && end <= str.length) {
        return true
      } else {
        start = end-1;
        end = end+end;
      }
    }

    async function getArticles() {
      const response = await api.get('saifapis/articles/');
      const data = await response.data;

      let newArticles = data.filter(article => {
        return searchChan(article.title.toLowerCase(), start, end)
      })
  
      setArticles(newArticles);
    }

    getArticles();
    
  }, [searchValue])


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

  let csrftoken = getCookie('csrftoken');



  async function logOut() {
    try {
      const response = await api.post('apis/logout/', {}, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken
        }
      });
      console.log(response.data);
      localStorage.setItem("auth", JSON.stringify({logged: false, hasAccount: true}));
      window.location.reload();
    } catch (err) {
      console.log("something happend");
      console.error(err)
    }
  }

  async function loggedIn(username, subscribe=false) {
    const response = await api.get(`apis/users/${username}/`);
    const id = await response.data['id']
    localStorage.setItem("auth", JSON.stringify({logged: true, username: username, id: id}));
    
    if (subscribe) {
      window.location.assign('/blog/request-sent/');
    } else {
      window.location.assign('/blog/');
    }
    
  }

  function load() {
    let onichan = document.createElement("div");
    let load = document.createElement("div");
    let loadChild1 = document.createElement("span");
    let loadChild2 = document.createElement("span");

    onichan.style.cssText = `position: absolute; 
                             top: 50%; 
                             left: 50%; 
                             transform-style: 
                             preserve-3d; 
                             perspective: 600px;`;
    onichan.appendChild(load);
    onichan.classList.add("onichanLoad");

    load.classList.add("Load");
    load.appendChild(loadChild1);
    load.appendChild(loadChild2);

    let rootChan = document.getElementById("root");
    rootChan.classList.add('loadState');
    loadChild1.classList.add("load1");
    loadChild2.classList.add("load2");
    rootChan.appendChild(onichan);
  }

  function endLoad() {
    let rootChan = document.getElementById("root");
    let onichan = document.querySelector(".onichanLoad");
    onichan.remove();
    rootChan.classList.remove('loadState'); 
  }

  return (
    <>
      <Header logOut={logOut} searchValue={searchValue} setSearchValue={setSearchValue} />
      <Routes>
        <Route path='/blog/post/' element={<Post load={load} endLoad={endLoad} />} />
        <Route path='/blog/read-:title' element={<Article />} />
        <Route path='/blog/' element={<Home articles={articles} setArticles={setArticles} />} /> 
        <Route path='/blog/signup/' element={<SignUp csrftoken={csrftoken} loggedIn={loggedIn} />} />
        <Route path='/blog/login/' element={<LogIn csrftoken={csrftoken} loggedIn={loggedIn} />} />
        <Route path='/blog/subscribe/' element={<Subscribe csrftoken={csrftoken} load={load} loggedIn={loggedIn} />} />
        <Route path='/blog/request-sent/' element={<RequestSent />} />
        <Route path='/blog/profile/' element={<Profile />} />
        <Route path='/blog/*' element={<Missing />} />
      </Routes>
    </>
  )
}
 
export default App;
