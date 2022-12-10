import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import img from './imgs/books1.jpeg';
import rdpd from './imgs/rdpd.jpeg';
import sww from './imgs/sww.jpg';
import gtg from './imgs/gtg.jpg';
import fclub from './imgs/5club.jpg';
import atomic from './imgs/atomic.jpeg';
import dw from './imgs/dw.jpg';

const Home = ({setId}) => {

  useEffect(() => {
    const list = document.querySelectorAll(".Selling>div ul li div");
    list.forEach(ele => {
      ele.addEventListener("click", (e) => {
        setId(ele.id);
      })
    })
  }, [])

  return (
    <section className='Home'>
      <div className='MainImg'>
        <img src={img} alt="" />
      </div>
      <div className='Selling'>
        <h2 style={{margin: "20px"}}>Best Selling</h2>
        <div className='flex-center'>
          <ul>
            
            <li>
              <Link to={'/ecommerce-project/bs-rich dad poor dad/'}>
                <div id='hXAiDAAAQBAJ' >
                  <img src={rdpd} alt="" />
                  <br />
                  <h4>Rich Dad Poor Dad</h4>
                </div>
              </Link>
            </li>
            
            <li>
              <Link to={'/ecommerce-project/bs-start with why/'}>
                <div id='fkOKDQAAQBAJ' >
                  <img src={sww} alt="" />
                  <br />
                  <h3>Start With Why</h3>
                </div>
              </Link>
            </li>
            
            <li>
              <Link to={'/ecommerce-project/bs-good-to-great/'}>
                <div id='2eaetGtO9HYC' >
                  <img src={gtg} alt="" />
                  <br />
                  <h3>Good To Great</h3>
                </div>
              </Link>
            </li>

            <li>
              <Link to={'/ecommerce-project/bs-the 5 am club/'}>
                <div id='wylVswEACAAJ' > 
                  <img src={fclub} alt="" />
                  <br />
                  <h3>The 5 am Club </h3>
                </div>
              </Link>
            </li>
            
            <li>
              <Link to={'/ecommerce-project/bs-atomic habits'}>
                <div id='fFCjDQAAQBAJ' >
                  <img src={atomic} alt="" />
                  <br />
                  <h3>Atomic Habits</h3>
                </div>
              </Link>
            </li>

            <li>
              <Link to={'/ecommerce-project/bs-deep work/'}>
                <div id='u5mCtAEACAAJ' >
                  <img src={dw} alt="" />
                  <br />
                  <h3>Deep Work</h3>
                </div>
              </Link>            
            </li>

          </ul>
        </div>
      </div>
    </section>
  )
}

export default Home;