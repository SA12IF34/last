import React, { useState, useEffect} from 'react';

const Books = ({books, navigator, setId, setTitle, setDescription}) => {

  function handleClick(id, title, description) {
    setId(id);
    setTitle(title);
    setDescription(description);
    
    if (title.includes("/")) {
      
      let newTitle = title.replace("/","-");
      navigator(`/ecommerce-project/book-${newTitle}/`);
      console.log("good");
      
    }else {
      navigator(`/ecommerce-project/book-${title}/`);
    }
    
    
  }

  return (
    <section className='Books'>
        <ul>
            {books.map(book => {
                return (
                <li className='Book'>
                    <div onClick={() => {handleClick(book.id, book.volumeInfo.title, book.volumeInfo.description)}}>
                        {book.volumeInfo.imageLinks ? ( <img src={book.volumeInfo.imageLinks.thumbnail} /> ) : (<></>)}
                        <div>
                            <h3>{book.volumeInfo.title}</h3>
                            <br />
                            <p>{String(book.volumeInfo.description).length > 100 ? (<>{book.volumeInfo.description.slice(0,100)}...</>) : (<>{book.volumeInfo.description}</>)}</p>
                        </div>
                    </div>
                </li>        
                )
            })}
        </ul>
    </section>
  )
}

export default Books;