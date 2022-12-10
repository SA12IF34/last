"use strict";
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import api from './api/api';



const Post = ({load, endLoad}) => {
  
  const [input, setInput] = useState(document.querySelectorAll(".type"));
  let writeAreas ;
  let imgInput;
  let rootChan = document.getElementById("root");

  const navigator = useNavigate();

  const [lines, setLines] = useState(1)
  const [imgsArray, setImgsArray] = useState([]);

  
  function closeSubheading(ele) {
    let child = ele.firstElementChild
    ele.innerText = child.value;
    child.remove()
  }
  

  useEffect(() => {

      imgInput = document.getElementById("imgInput")

      let element = document.querySelector(".WriteArea").lastElementChild;


      if (element.tagName === "P") {
        element.addEventListener("keypress", e => {
          if (e.key === "Enter") {
            e.preventDefault();
            var newLine = document.createElement("p");
            var br = document.createElement("br")

            newLine.appendChild(br);
            newLine.addEventListener("keypress", (e) => {
              if (newLine.firstElementChild) {
                newLine.removeChild(br);
              }
            })
            
            
            element.appendChild(newLine);
            
            let s = document.getSelection();
            let r = document.createRange();

            r.setStart(element.lastElementChild, 0);
            r.setEnd(element.lastElementChild, 0);
            s.removeAllRanges();
            s.addRange(r);
            
          };

          
          
        })
        
      }

      if (element.tagName === "H2" || element.tagName === "P") {
        element.addEventListener('keyup', (e) => {
          if (e.key === "Backspace") {

            if (e.target.value === "" || e.target.innerText === "" && e.target.tagName === "P" && e.target.classList[0] !== "special") {
              
              backLine(element);
            }
          }
        })
      }

      
      if (element.tagName === "H2") {
        
        element.addEventListener("keypress", (e) => {
          if (e.key === "Enter") {
            closeSubheading(element);
            newLine(element);
          }
        })

        

      } else if (element.tagName === "DIV") {
        document.addEventListener('keypress', (e) => {
          
          if (e.key === "Enter") {
            
            newLine(e.target);
              
          }
        });

      }

      imgInput.onchange = async (e) => {
        let file = e.target.files[0];
        let reader = new FileReader();
  
        reader.onload = () => {
          addImg(reader.result);
        }
  
        reader.readAsDataURL(file);
  
      }
      
      
    

  }, [lines])

  
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
  

  function newLine(ele=null, parent=null) {
    
    if (ele.tagName === "P" ) {
      ele.setAttribute("contentEditable", "false");
      ele.classList.toggle("focused");
    }

    let p = document.createElement('p');
    p.classList.add('w', "focused");
    p.setAttribute("contentEditable", "true");

    let something = document.querySelector(".WriteArea");
    something.appendChild(p);
    p.focus();

    var num  = lines + 1;
    setLines(num);
    
  }

  function backLine(ele) {
    let parent = ele.parentElement;
    let children = parent.children;
    let target = children[children.length-2];


    if (target.tagName === "P") {
      
      target.classList.add("type", "focused");
      target.setAttribute("contentEditable", "true");
      target.classList.remove("finish");
      target.focus();
      
      document.execCommand('selectAll', false, null)
      document.getSelection().collapseToEnd()

    } else if (target.tagName === "H2") {

      let inputChan = document.createElement("input");
      inputChan.value = target.innerText;
      target.innerHTML = "";

      target.appendChild(inputChan);
      inputChan.focus()
    }
    
    ele.remove();

    var num = lines - 1;

    setLines(num);
    
  }


  function addImg(img) {

    let parent = document.querySelector(".WriteArea");
    let ele = parent.lastElementChild;
    let theKey = parent.children.length-1;


    let imgchan = document.createElement("img");
    imgchan.src = img;

    let div = document.createElement("div");
    div.appendChild(imgchan);

    imgchan.classList.add("imgchan");
    document.querySelector(".WriteArea").appendChild(div);
    
    div.style.cssText = "position: relative; width: max-content; height: max-content";

    let button = document.createElement("div");
    button.classList.add("Btn");
    button.innerText = "X";

    div.onmousemove = () => {
      div.appendChild(button);
      button.onclick = () => {
        removeImg(div);
      }
      
    }

    div.onmouseleave = () => {
      button.remove();
    }

    if (ele.tagName === "H2") {

      closeSubheading(ele);

    } 

    newLine(ele);
    var num = theKey+1;
    var arr = imgsArray;
    arr.push(num);

  }

  function removeImg(ele) {
    ele.remove();
    
    var num = lines - 1;
    
    setLines(num);
    
  }

  function addSubheading(ele) {

    if (ele.tagName === "P") {
      ele.setAttribute("contentEditable", "false");
      ele.classList.toggle("focused")
    }

    let h2 = document.createElement("h2");
    let input = document.createElement("input");

    h2.classList.add("subheading");
    h2.appendChild(input);
    input.classList.add("type");
    input.type = 'text';
    
    document.querySelector(".WriteArea").appendChild(h2);
    input.focus();

    var num = lines + 1;

    
    setLines(num);    
    
  }

  window.onload = () => {

    let n = 0;
    
    writeAreas = document.querySelectorAll(".type");
    writeAreas.forEach((w, e) => {
      
      imgInput.onchange = (e) => {
        let file = e.target.files[0];
        let reader = new FileReader();
  
        if (file) {
          reader.readAsDataURL(file)
        } else {
          alert("there is a problem.");
        }
        
  
        reader.onloadend = () => {
          addImg(reader.result, w)
        };
  
      }

      w.addEventListener('keypress', (e) => {
        
        if (e.key === "Enter") {
          if (n < 1) {
            newLine(w);
            n+=1
          }
        }
      })
    } )
    

  }


  async function handleSubmit() {

    load();

    let data = document.querySelector(".WriteArea").childNodes;
    let title = data[0].firstElementChild.value;
    data[0].remove();
    let last = document.querySelector(".WriteArea").lastElementChild;
    last.setAttribute("contentEditable", "false");
    last.classList.remove("focused");
    
    let imgsArr = [];

    for (var i=0; i < data.length; i++) {
      if (data[i].tagName === "DIV") {
        imgsArr.push(data[i].firstElementChild);
        data[i].firstElementChild.remove();
      }
    }


    let user = JSON.parse(localStorage.getItem("auth"));

    const response = await api.post("saifapis/articles/", {
      title: title,
      paragraph: JSON.stringify(document.querySelector(".WriteArea").innerHTML),
      author_name: user.username,
      author: user.id
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken
      }
    })

    const status = await response.status;

    if (status === 201) {
      const response2 = await api.get(`saifapis/articles/${title}/`);
      const id = await response2.data.id;

      await api.post('saifapis/created-articles/', {
        title : title,
        article: id,
        author: user.username
      }, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken
        }
      });

      for (var img of imgsArr) {
        await api.post('saifapis/imgs/', {
          img: img.src,
          line_number: 1,
          img_article: id          
        }, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
          }
        });

      }

      

      endLoad();
      window.location.assign("/blog/");
    }

  }

  return (
    <div className='Post'>

     <section className='Write'>
     <label id='inputLabel'>
      Add Image
     <input type="file" src="" alt="" id='imgInput' style={{width: "80px", height: "80px"}} />
     </label>
     <button onClick={() => {
      let ele = document.querySelector(".WriteArea").lastElementChild;
      addSubheading(ele);
      }} className="addSubheading">Add Subheading</button>
      <hr />
      <div className='WriteArea'>
        <h1 className='title'><input type="text" autoFocus placeholder='The Title' /></h1>
        <p contentEditable="true" className='special w focused'>
          
          
        </p>
        
      </div>
      <button className='Submit' onClick={() => { handleSubmit() }}>Submit</button>
      </section>    
    </div>
  )
}

export default Post;