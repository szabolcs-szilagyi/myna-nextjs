import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {API_SERVER as API_SERVER} from '../src/constants';
import Cookies from 'universal-cookie';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Ping from '../components/Ping';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
const cookies = new Cookies();
const hash = cookies.get('hash');

import SizeInfo from '../components/SizeInfo';

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
            <div className="col-md-12 ce capitalLetters">
              <h2><strong>Size and Measurements</strong></h2>
            </div>
          </div>
        <div className="spacer50px" />
        <div className="row">
          <div className="col-md-2" />
          <div className="col-md-8 ce">
            <div>
              <SizeInfo tableClass="mainMeas"/>
            </div>
          <div className="spacer50px" />
          <div className="spacer25px" />
          <p>If you find that your measurements sit outside of the sizes offered, please email us on <br /><a href="mailto:connect@mynalabel.com" className="blackFont">connect@mynalabel.com</a> with your measurements and we'll do our best to advise and assist you.</p>
          <div className="spacer25px" />
          <p>How to take your own measurements: <br />
            Use tape measure and keep tape firm to the body, but not too tight <br />
            Best to measure over your underwear <br />
            It is recommended that you ask someone to help you take your measurements <br />
            BUST: Measure around fullest part of your bust and across <br />
            WAIST: Measure around your natural waist keeping tape comfortably loose <br />
            HIPS: Stand with your feet together, then measure around the fullest part of your bottom at the top of your legs, approximately 20cm below your waistline
          </p>
          </div>
          <div className="col-md-2" />
        </div>
        <div className="spacer50px" />
        <Footer />
      </Container>
		);
	}
}
