import React, { useState } from 'react';
import ReactDOM from 'react-dom';
//import { useRouter } from 'next/router';
import {API_SERVER as API_SERVER} from '../src/constants';
import Cookies from 'universal-cookie';
//import UserMenu from '../components/UserMenu';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Ping from '../components/Ping';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
//import 'bootstrap/dist/css/bootstrap.min.css';
import "../src/styles.css";
const cookies = new Cookies();
const hash = cookies.get('hash');

export default class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nextPage: ''
    };

    this.connectionAlive = this.connectionAlive.bind(this);

  }

  connectionAlive() {

  }

  componentDidUpdate() {
  }
  componentDidMount() {
    console.log (window.location.pathname);
  }
  render() {
		return (
			<Container fluid>
      <Header />
        <Nav />
        <Ping />
        <div className="spacer50px" />
        <div className="row">
          <div className="col-md-2" />
          <div className="col-md-8">
            <p>M Y N A was inspired by friendship between Justyna and Magdalena and shared love for ethical living.</p>
            <p>When we met in the U.K. in 2003 we soon realised we’ve come from neighbourly towns in Poland and our moms not only share same first name and a birthday month, but both are professional seamstresses. We both grew up surrounded by and wearing tailored handmade clothing and we both learned to sew at a young age.</p>
            <p>We both soon moved to London. After attending London College of Fashion, Justyna pursued career in visual merchandising for Gant in London and later in Europe for Marco-O-Polo. She continued to design and handcraft fashion pieces for herself, her family and friends. I completed a degree at University College London and pursued career in business and finance.</p>
            <p>Over the years we continued to deepen our connection through sisterly-like affection and shared values. We kept inspiring each other and sharing new ways to ensure ethical and sustainable living. Transforming wardrobes was next step for both of us and that inspired an idea for creating MYNA, an ethical clothing label that combines love for timeless fashion and passion for sustainable living.</p>
            <div className="spacer25px" />
            <img className="ourStory" src="./our-story.jpeg"/>
          </div>
          <div className="col-md-2" />
        </div>
        <div className="spacer50px" />
        <Footer />
      </Container>
		);
	}
}
