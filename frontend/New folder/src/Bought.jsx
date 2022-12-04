import React, { useState, useEffect } from 'react';
import api from './apis/api';

const Bought = () => {

  const [books, setBooks] = useState([])

  async function boughts() {
    const response = await api.get("boughts/");
    const status = await response.status;
    if (status === 200) {
      const data = await response.data;
      setBooks(data);
    }
  }

  boughts();

  return (
    <section className='Bought Items'>
      <ul>
      {books.length > 0 ? (books.map(book => {
        return (
          <li>
            <div className='BoughtItem'>
              <h3>{book.book_name}</h3>
            </div>
          </li>
        )
      })) : (<><h2 style={{margin: "20px"}}>You have not bought any books...</h2></>)}
      </ul>
    </section>
  )
}

export default Bought;