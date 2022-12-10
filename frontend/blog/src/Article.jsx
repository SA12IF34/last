import React, {useEffect, useState, useRef} from 'react';
import {useParams} from 'react-router-dom';
import api from './api/api';

// Focus On The First And The Last

const Article = () => {

  const [titleChan, settitle] = useState("");
  const [contentChan, setContent] = useState();
  let articleID;

  const [imgs, setImg] = useState([]); 


  const {title} = useParams();
  useEffect(() => {
    async function getArticle() {
      const response = await api.get(`saifapis/articles/${title}/`);
      if (response.status === 200) {

        const data = await response.data;
        articleID = data.id;

        settitle(data.title);
        setContent(JSON.parse(data.paragraph));
      }

      try {
        const response = await api.get(`saifapis/imgs/${articleID}/`);
        const data = await response.data;
        setImg(data);
      } catch (error) {
        
        if (error.message.endWith("500") || error.message.endWith("404")) {
          console.log("there is no imgs");
        } else {
          alert("for somereasone we couldn't render the imgs");
        }
      }
    };



    getArticle();

  }, []);


  let container = document.querySelector(".Ultra");
  

  if (container) {
    container.innerHTML = contentChan;
    let children = container.childNodes;

    for (var child of children) {

      if (child.tagName === "P" && child.innerHTML === '' || child.firstElementChild && child.firstElementChild.tagName === "BR") {
        
        child.remove();
      }

    }

    for (var child of children) {
      if (child.tagName === "DIV") {

        if (imgs.length) {
  
          var img = document.createElement("img");
          img.src = imgs[0]['img'];
          img.classList.add("imgchan");
  
          child.appendChild(img);
          imgs.shift();
        }
        
      } 
    }
    
  }
  


  return (
    <div className="Article"> 
        <h1>{titleChan}</h1><br /><br />
        <div className='Ultra'>
          
        </div>
    </div>
  )

  
}

export default Article;