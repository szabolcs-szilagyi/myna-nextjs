import React, { Component } from 'react';
import "../src/slider.css";
import dynamic from 'next/dynamic';
const Slide = dynamic(() =>
  import('react-slideshow-image').then((slideshow) => slideshow.Slide),
  { ssr: false }
)
const slideImages = [
  './slide_1.jpg',
  './slide_2.jpg',
  './slide_3.jpg'
];
const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
  pauseOnHover: true,
  onChange: (oldIndex, newIndex) => {
    console.log(`slide transition from ${oldIndex} to ${newIndex}`);
  }
}
/*
const Slideshow = () => {
    return (
      <div className="slide-container">
        <Slide {...properties}>
          <div className="each-slide">
            <div style={{'backgroundImage': `url(${slideImages[0]})`}}>
              <span>Slide 1</span>
            </div>
          </div>
          <div className="each-slide">
            <div style={{'backgroundImage': `url(${slideImages[1]})`}}>
              <span>Slide 2</span>
            </div>
          </div>
          <div className="each-slide">
            <div style={{'backgroundImage': `url(${slideImages[2]})`}}>
              <span>Slide 3</span>
            </div>
          </div>
        </Slide>
      </div>
    )
}
*/
export default class Slider extends Component {
    render () {
      return (
        <div className="slide-container">
          <Slide {...properties}>
            <div className="each-slide">
              <div style={{'backgroundImage': `url(${slideImages[0]})`}}>
                <div className="textcontainer">
                  <h3>autumn collection</h3>
                  <a href="/autumn-collection" className="button">SHOP THE LOOK</a>
                </div>
              </div>
            </div>
            <div className="each-slide">
              <div style={{'backgroundImage': `url(${slideImages[1]})`}}>
                <div className="textcontainer">
                  <h3>autumn collection</h3>
                  <a href="/lookbook" className="button">LOOKBOOK</a>
                </div>
              </div>
            </div>
            <div className="each-slide">
              <div style={{'backgroundImage': `url(${slideImages[2]})`}}>
                <div className="textcontainer">
                  <h3>Our Story</h3>
                  <a href="/our-story" className="button2">READ MORE</a>
                </div>
              </div>
            </div>
          </Slide>
        </div>
      )
    }
}
