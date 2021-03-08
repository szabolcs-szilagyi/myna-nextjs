import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import { API_SERVER } from '../src/constants';
import Slider from '../components/Slider';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Ping from '../components/Ping';
import "../src/styles.css";

import Cookies from 'universal-cookie';
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
        <div className="row">
          <div className="col-md-12 noPadding">
            <Slider />
          </div>
        </div>
        <div className="spacer50px"></div>
        <div className="row">
          <div className="col-md-12 ce capitalLetters">
            Your Loved Pieces
          </div>
        </div>
        <div className="spacer50px"></div>
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-6 ce">
                <a href="/leya-wrap-dress"><div className={this.state.divClass} onMouseOver={this.hoverPhotoIn} onMouseOut={this.hoverPhotoOut}><img className="dyn" src={`/product_photos/leya-wrap-dress-01.jpg`} alt="LEYA Wrap Dress" /><p>LEYA Wrap Dress <br /><span>€319</span></p></div></a>
                <div className="spacer25px"></div>
              </div>
              <div className="col-md-6 ce">
                <a href="/dahlia-blouse"><div className={this.state.divClass} onMouseOver={this.hoverPhotoIn} onMouseOut={this.hoverPhotoOut}><img className="dyn" src={`/product_photos/dahlia-blouse-01.jpg`} alt="DAHLIA Blouse" /><p>DAHLIA Blouse <br /><span>€105</span></p></div></a>
                <div className="spacer25px"></div>
              </div>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-6 ce">
                <a href="/tuli-dress"><div className={this.state.divClass} onMouseOver={this.hoverPhotoIn} onMouseOut={this.hoverPhotoOut}><img className="dyn" src={`/product_photos/tuli-dress-03.jpg`} alt="TULI Dress" /><p>TULI Dress <br /><span>€169</span></p></div></a>
                <div className="spacer25px"></div>
              </div>
              <div className="col-md-6 ce">
                <a href="/bella-hand-painted-blouse"><div className={this.state.divClass} onMouseOver={this.hoverPhotoIn} onMouseOut={this.hoverPhotoOut}><img className="dyn" src={`/product_photos/bella-print-01.jpg`} alt="BELLA Hand Painted Blouse" /><p>BELLA Hand Painted Blouse <br /><span>€129</span></p></div></a>
                <div className="spacer25px"></div>
              </div>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-6 ce">
                <a href="/reeva-denim-jacket"><div className={this.state.divClass} onMouseOver={this.hoverPhotoIn} onMouseOut={this.hoverPhotoOut}><img className="dyn" src={`/product_photos/reeva-denim-jacket-01.jpg`} alt="REEVA Denim Jacket" /><p>REEVA Denim Jacket <br /><span>€159</span></p></div></a>
                <div className="spacer25px"></div>
              </div>
              <div className="col-md-6 ce">
                <a href="/senna-skirt"><div className={this.state.divClass} onMouseOver={this.hoverPhotoIn} onMouseOut={this.hoverPhotoOut}><img className="dyn" src={`/product_photos/senna-skirt-01.jpg`} alt="SENNA Skirt" /><p>SENNA Skirt <br /><span>€135</span></p></div></a>
                <div className="spacer25px"></div>
              </div>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
        <Footer />
      </Container>
		);
	}
}
