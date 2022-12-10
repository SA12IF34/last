import React, { useState, useEffect } from 'react';
import api from './apis/api';

const Cart = ({checkOut, csrftoken, alertChan}) => {

  const [books, setBooks] = useState([])

  useEffect(() => {
  
    async function something() {
      const user = JSON.parse(localStorage.getItem("auth"));

      const response = await api.get(`cart/${user.id}/`);
      const status = await response.status;
      if (status === 200) {
        setBooks(response.data)
      }
    }

    something()
    
  }, [])


  async function removeBook(name, id, reload) {
    const response = await await api.delete(`books/${name}for${id}/`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken
      },
    });

    const status = await response.status;

    if (status === 204) {
      if (reload) {
        window.location.reload();
      }else {
        console.log("good");
      }
    }

  }

  return (
    <section className='Cart Items'>
      <ul>
      {books.length > 0 ? (books.map(book => {
        return (
          <li>
            <div className='CartItem'>
              <h3>{book.book_name}</h3>
              <div>
                <form style={{display: "inline"}} action="/apis/checkoutchan/" method="POST">
                  <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
                  <input type="submit" style={{display: 'none'}} className='SubmitChan' />
                </form>
                <button onClick={() => {
                    let submit = document.querySelector('.SubmitChan');
                    removeBook(book.book_name, book.owner, false);
                    alertChan(book.book_name, book.book_id, submit);
                    
                  }} className='One'>Check Out</button>
                <button onClick={() => {removeBook(book.book_name, book.owner, true)}} className='Two'>Remove</button>
              </div>
            </div>
          </li>
        )
      })) : (<><h2 style={{margin: "20px"}}>There are no books in the cart...</h2></>)}
      </ul>
    </section>
  )
}

export default Cart;