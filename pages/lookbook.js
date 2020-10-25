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
      nextPage: '',
      divClass: 'cImage'
    };

    this.connectionAlive = this.connectionAlive.bind(this);
    this.hoverPhotoIn = this.hoverPhotoIn.bind(this);
    this.hoverPhotoOut = this.hoverPhotoOut.bind(this);
  }

  connectionAlive() {

  }
  hoverPhotoIn (e) {
    e.currentTarget.classList.add('cImageHovered');
  }
  hoverPhotoOut (e) {
    e.currentTarget.classList.remove('cImageHovered');
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
            <h2><strong>Lookbook</strong></h2>
          </div>
        </div>
        <div className="spacer50px" />
        <div className="row">
          <div className="col-md-2" />
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-7 ce">
                <div className="lbtxtContainer">
                  <div className="lbtxt">
                    Presenting MYNA <br />autumn collection <br /><br />Sustainably made with love.
                  </div>
                </div>
              </div>
              <div className="col-md-4 ce">
                <a href="/autumn-collection"><div className={this.state.divClass} onMouseOver={this.hoverPhotoIn} onMouseOut={this.hoverPhotoOut}><img className="dyn" src="./lookbook01.jpg" alt="" /></div></a>
                <div className="spacer25px" />
              </div>
              <div className="col-md-1 ce" />
            </div>
          </div>
          <div className="col-md-2" />
        </div>
        <div className="row">
          <div className="col-md-2" />
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-6 ce">
                <a href="/autumn-collection"><div className={this.state.divClass} onMouseOver={this.hoverPhotoIn} onMouseOut={this.hoverPhotoOut}><img className="dyn" src="./lookbook02.jpg" alt="" /></div></a>
                <div className="spacer25px" />
              </div>
              <div className="col-md-6 ce">
                <a href="/autumn-collection"><div className={this.state.divClass} onMouseOver={this.hoverPhotoIn} onMouseOut={this.hoverPhotoOut}><img className="dyn" src="./lookbook03.jpg" alt="" /></div></a>
                <div className="spacer25px" />
              </div>
            </div>
          </div>
          <div className="col-md-2" />
        </div>
        <div className="row">
          <div className="col-md-2" />
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-3" />
              <div className="col-md-8 ce">
                <a href="/autumn-collection"><div className={this.state.divClass} onMouseOver={this.hoverPhotoIn} onMouseOut={this.hoverPhotoOut}><img className="dyn" src="./lookbook04.jpg" alt="" /></div></a>
                <div className="spacer25px" />
              </div>
              <div className="col-md-1" />
            </div>
          </div>
          <div className="col-md-2" />
        </div>

        <div className="row">
          <div className="col-md-2" />
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-8 ce">
                <a href="/autumn-collection"><div className={this.state.divClass} onMouseOver={this.hoverPhotoIn} onMouseOut={this.hoverPhotoOut}><img className="dyn" src="./lookbook05.jpg" alt="" /></div></a>
                <div className="spacer25px" />
              </div>
              <div className="col-md-4 ce">
                <a href="/autumn-collection"><div className={this.state.divClass} onMouseOver={this.hoverPhotoIn} onMouseOut={this.hoverPhotoOut}><img className="dyn" src="./lookbook06.jpg" alt="" /></div></a>
                <div className="spacer25px" />
              </div>
            </div>
          </div>
          <div className="col-md-2" />
        </div>

        <div className="row">
          <div className="col-md-2" />
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-2" />
              <div className="col-md-8 ce">
                <a href="/autumn-collection"><div className={this.state.divClass} onMouseOver={this.hoverPhotoIn} onMouseOut={this.hoverPhotoOut}><img className="dyn" src="./lookbook07.jpg" alt="" /></div></a>
                <div className="spacer25px" />
              </div>
              <div className="col-md-2" />
            </div>
          </div>
          <div className="col-md-2" />
        </div>

        <div className="row">
          <div className="col-md-2" />
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-6 ce">
                <a href="/autumn-collection"><div className={this.state.divClass} onMouseOver={this.hoverPhotoIn} onMouseOut={this.hoverPhotoOut}><img className="dyn" src="./lookbook08.jpg" alt="" /></div></a>
                <div className="spacer25px" />
              </div>
              <div className="col-md-6 ce">
                <a href="/autumn-collection"><div className={this.state.divClass} onMouseOver={this.hoverPhotoIn} onMouseOut={this.hoverPhotoOut}><img className="dyn" src="./lookbook09.jpg" alt="" /></div></a>
                <div className="spacer25px" />
              </div>
            </div>
          </div>
          <div className="col-md-2" />
        </div>

        <Footer />
      </Container>
		);
	}
}
