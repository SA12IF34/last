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

  useEffect(() => {
    let rcmds = document.querySelectorAll(".rcmd");
    let container = document.querySelector(".Recommendations");
    setWidth(container.clientWidth)
    rcmds.forEach(e => {
      e.style.width = `${width}px`;
    })
  }, [width])

  useEffect(() => {
    let business = document.querySelector(".Business");
    let selfDev = document.querySelector(".SelfDev");


    setInterval(() => {
      if (selfDev.style.left === '') {
        business.style.left = '50%';
        selfDev.style.left = '-50%';
      }
      else if (selfDev.style.left === '-50%') {
        business.style.left = '';
        selfDev.style.left = '';
      }
    }, 3000)
  })

  window.onresize = () => {
    setWidth(container.clientWidth)
  }




  return (
    <section className='Home'>
      <div className='MainImg'>
        <img src={img} alt="" />
      </div>
      <div className='Recommendations'>
        <div>
          <div className='Business rcmd'>
            <h2>Businesss Recommendations</h2>
            <br />
            <ul>
              <li>
                <div>
                  <img src={rdpd} alt="" />
                  <br />
                  <h3>Rich Dad Poor Dad</h3>
                </div>
              </li>

              <li>
                <div>
                  <img src={sww} alt="" />
                  <br />
                  <h3>Start With Why</h3>
                </div>
              </li>

              <li>
                <div>
                  <img src={gtg} alt="" />
                  <br />
                  <h3>Good To Great</h3>
                </div>
              </li>
            </ul>

          </div>
          <div className='SelfDev rcmd'>
            <h2>Self Development Recommendations</h2>
            <br />
            <ul>
              <li>
                <div>
                  <img src={fclub} alt="" />
                  <br />
                  <h3>5:00 A.M Club</h3>
                </div>
              </li>

              <li>
                <div>
                  <img src={atomic} alt="" />
                  <br />
                  <h3>Atomic Habits</h3>
                </div>
              </li>

              <li>
                <div>
                  <img src={dw} alt="" />
                  <br />
                  <h3>Deep Work</h3>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}


export default Home;