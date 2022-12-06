import React, { useEffect, useState } from 'react';

// The Ground
import img from './imgs/books1.jpeg';

// Business
import rdpd from './imgs/rdpd.jpeg';
import sww from './imgs/sww.jpg';
import gtg from './imgs/gtg.jpg';

// Self Dev
import fclub from './imgs/5club.jpg';
import atomic from './imgs/atomic.jpeg';
import dw from './imgs/dw.jpg';

const Home = () => {

  const [width, setWidth] = useState();

 

  if (window.matchMedia("(max-width: 540px)").matches) {

  } else if (window.matchMedia("(max-width: 1024px)").matches) {

  } else if (window.matchMedia("(max-width: 1440px)").matches) {

  }





  return (
    <section className='Home'>
      <div className='MainImg'>
        <img src={img} alt="" />
      </div>
      <div className='Recommendations'>
        <h2 style={{margin: "20px"}} >Recommendations</h2>
        <br />
        <div >

          <div>
            <img src={rdpd} alt="" />
            <br />
            <h3>Rich Dad Poor Dad</h3>
          </div>

          <div>
            <img src={sww} alt="" />
            <br />
            <h3>Start With Why</h3>
          </div>

          <div>
            <img src={gtg} alt="" />
            <br />
            <h3>Good To Great</h3>
          </div>

          <div>
            <img src={fclub} alt="" />
            <br />
            <h3>5:00 A.M Club</h3>
          </div>

          <div>
            <img src={atomic} alt="" />
            <br />
            <h3>Atomic Habits</h3>
          </div>

          <div>
            <img src={dw} alt="" />
            <br />
            <h3>Deep Work</h3>
          </div>

        </div>
      </div>
    </section>
  )
}


export default Home;