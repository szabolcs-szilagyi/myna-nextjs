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
            <div className="col-md-12 ce capitalLetters">
              <h2><strong>Privacy</strong></h2>
            </div>
          </div>
        <div className="spacer50px" />
        <div className="row">
          <div className="col-md-2" />
          <div className="col-md-8">
            <p>We respect your privacy rights and keep any information we collect secure.</p>
            <p>The information you share with us at the point of sale is saved securely and is only used to fulfil your order. Any records of our customers are stored and are strictly private and confidential (name, address, email, phone number when applicable). We do not store credit card details. We will not sell or disclose any personal information to third parties unless under legal obligation to a fraud prevention agency.</p>
            <p>When you subscribe to our mailing list, you will only receive marketing information in regards to M Y N A. If at any point you wish to be taken off our communication updates please let us know at <a href="mailto:connect@mynalabel.com" className="blackFont">connect@mynalabel.com</a>.</p>
            <div className="spacer50px" />
            <h2 className="capitalLetters ce"><strong>Contact</strong></h2>
            <div className="spacer50px" />
            <p><strong>If you need to speak to us about existing or future orders, or anything else email us on:</strong> <br /><a href="mailto:connect@mynalabel.com" className="blackFont">connect@mynalabel.com</a></p>
            <p><strong>Social media:</strong> <br /><a href="https://instagram.com/mynalabel" target="_blank" className="blackFont">instagram.com/mynalabel</a></p>
          </div>
          <div className="col-md-2" />
        </div>
        <div className="spacer50px" />
        <Footer />
      </Container>
		);
	}
}
