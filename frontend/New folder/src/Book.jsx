import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from './apis/api';

const Book = ({id, title, description, checkOut, csrftoken}) => {

  const [img, setImg] = useState();
  
  useEffect(() => {
    console.log();
  }, [])

  const {name} = useParams();
  const user  = JSON.parse(localStorage.getItem("auth")).name;


  async function addToCart(title, id) {    

    const response = await api.post('cart/', {owner: user, 
                                            book_name: title, 
                                            book_id: id}, 
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken
      },
    });
    const status = await response.status;
    if (status === 201) {
      alert("the book is added");
    } 
  }

  return (
    <section className='BookPage'>
        <div className='BookCover'>
          <img  src={`https://books.google.com/books/publisher/content/images/frontcover/${id}?fife=w500-h700&source=gbs_api`} alt="" />
        </div>
        <div>
          <h2>{title}</h2>
          <br />
          <p>{description}</p>
          <br />
          <button onClick={() => {
            addToCart(title, id)
          }} className='Btn'>
            <h3>Add to Cart</h3>
          </button>
          <form  action="/apis/checkoutchan/" onSubmit={(e) => {
            
            checkOut(title, id)
          }} method='POST'>
            <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
            <button  className='Btn' type="submit">
                <h3>Checkout</h3>
            </button>
          </form>
        </div>

    </section>
  )
}

export default Book;