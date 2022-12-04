import React from 'react';
import { Link } from 'react-router-dom';

const Success = ({buy}) => {

  buy();
  
  return (
    <section style={{padding: "20px"}} className='Success'>
        <h1>The Operation Succeeded :) ...</h1>
        <Link style={{margin: "15px"}} to={'/ecommerce-project/'}><h3>Back To Home Page</h3></Link>
    </section>
  )
}

export default Success;