import React from 'react';
import { Link } from 'react-router-dom';

const RequestSent = () => {
  return (
    <div style={{padding:'20px'}}>
        <h1>The Request Is Sent, Please Wait An Email From Us</h1><br /><br />
        <Link to={'/blog/'}>Back To Home</Link>
    </div>
  )
}

export default RequestSent;