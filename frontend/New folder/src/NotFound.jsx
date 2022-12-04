import React from 'react';
import {Link} from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{padding: '20px'}}>
        <h2>The Page Does Not Exist..</h2>
        <h3 style={{marginLeft: '10px'}}><Link to={'/ecommerce-project/'}>Back to Home</Link></h3>
    </div>
  )
}

export default NotFound;