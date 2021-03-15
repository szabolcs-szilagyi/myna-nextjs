import React, { Component } from 'react';
import dynamic from 'next/dynamic';

import styles from './Slider.module.css';

const Slide = dynamic(() =>
  import('react-slideshow-image').then((slideshow) => slideshow.Slide),
  { ssr: false }
);

const slides = [
  {
    text: 'shop collection',
    linkText: 'SHOP THE LOOK',
    linkHref: '/shop-collections',
    imageSrc: './slide_1.jpg',
    buttonClass: styles.button,
  },
  {
    text: 'shop collections',
    linkText: 'LOOKBOOK',
    linkHref: '/lookbook',
    imageSrc: './slide_2.jpg',
    buttonClass: styles.button,
  },
  {
    text: 'Our Story',
    linkText: 'READ MORE',
    linkHref: '/our-story',
    imageSrc: './slide_3.jpg',
    buttonClass: styles.button2,
  }
];

const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
  pauseOnHover: true,
};

export default class Slider extends Component {
    render () {
      return (
        <div className={styles.slideContainer}>
          <Slide {...properties}>
            {slides.map(({ text, linkText, linkHref, imageSrc, buttonClass }, i) => (
              <div key={`slider-${i}`} className={styles.eachSlide}>
                <div style={{'backgroundImage': `url(${imageSrc})`}}>
                  <div className={styles.textcontainer}>
                    <h3>{text}</h3>
                    <a href={linkHref} className={buttonClass}>{linkText}</a>
                  </div>
                </div>
              </div>
            ))}
          </Slide>
        </div>
      )
    }
}
