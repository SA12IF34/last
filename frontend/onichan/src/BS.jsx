import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import api from './apis/api';



// https://www.googleapis.com/books/v1/volumes/${id}?key=AIzaSyDC_qS2Su7sFIxffrkpvXJ52bFkUOoLdzQ

const BS = ({id, addToCart, checkOut, csrftoken, alertChan}) => {

  const [title, setTitle] = useState();
  
  const user = JSON.parse(localStorage.getItem("auth"));

  const {name} = useParams();
//   console.log(id);



  useEffect(() => {
    async function getBook() {
        const response = await api.get(`https://www.googleapis.com/books/v1/volumes/${id}?key=AIzaSyDC_qS2Su7sFIxffrkpvXJ52bFkUOoLdzQ`)
        const data = await response.data;
        setTitle(data.volumeInfo.title);
        document.querySelector(".desc").innerHTML = data.volumeInfo.description;
        console.log(data.volumeInfo.description);
        // setBook(data.volumeInfo)
    }

    getBook();

  }, [])


  return (
    <section className='BookPage'>
        <div className='BookCover'>
          <img  src={`https://books.google.com/books/publisher/content/images/frontcover/${id}?fife=w500-h700&source=gbs_api`} alt="" />
        </div>
        <div>
          <h2>{title}</h2>
          <br />
          <p className='desc'></p>
          <br />
          <button onClick={() => {
              
              addToCart(title, id);
            }} className='Btn'>

            <h3>Add to Cart</h3>
          </button>

          <form action={user ?  "/apis/checkoutchan/" : (onsubmit=(e)=>{e.preventDefault()} )}  method='POST'>
            <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
            <input type="submit" style={{display: 'none'}} className="SubmitChan" />
          </form>
          <button onClick={() => {
            let submit = document.querySelector(".SubmitChan");
             alertChan(title, id, submit)
            }}  className='Btn' >
                <h3>Checkout</h3>
            </button>
        </div>
    </section>
  )
}

export default BS;