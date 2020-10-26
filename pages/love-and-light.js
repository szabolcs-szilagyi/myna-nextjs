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
            <h2><strong>Shop Love & Light</strong></h2>
          </div>
        </div>
        <div className="spacer50px" />
        <div className="row">
          <div className="col-md-2" />
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-6 ce">
                <a href="/lotus-sand"><div className={this.state.divClass} onMouseOver={this.hoverPhotoIn} onMouseOut={this.hoverPhotoOut}><img className="dyn" src={`${API_SERVER}productphotos/mynawebshop-whitedress-1.jpg`} alt="Lotus Woven Dress" /><p>Lotus Woven Dress <br /><span>€160</span></p></div></a>
                <div className="spacer25px" />
              </div>
              <div className="col-md-6 ce">
                <a href="/ivy-cream"><div className={this.state.divClass} onMouseOver={this.hoverPhotoIn} onMouseOut={this.hoverPhotoOut}><img className="dyn" src={`${API_SERVER}productphotos/mynawebshop-whitetshirt-1.jpg`} alt="Ivy Knitted Jersey Top" /><p>Ivy Knitted Jersey Top <br /><span>€40</span></p></div></a>
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
              <div className="col-md-6 ce">
                <a href="/aster-green"><div className={this.state.divClass} onMouseOver={this.hoverPhotoIn} onMouseOut={this.hoverPhotoOut}><img className="dyn" src={`${API_SERVER}productphotos/mynawebshop-greenpants-1.jpg`} alt="Aster Green" /><p>Aster Woven Culotte Pants <br /><span>€120</span></p></div></a>
                <div className="spacer25px" />
              </div>
              <div className="col-md-6 ce">
                <a href="/aster-sand"><div className={this.state.divClass} onMouseOver={this.hoverPhotoIn} onMouseOut={this.hoverPhotoOut}><img className="dyn" src={`${API_SERVER}productphotos/mynawebshop-linenpants-1.jpg`} alt="Aster Sand" /><p>Aster Woven Culotte Pants <br /><span>€120</span></p></div></a>
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
              <div className="col-md-6 ce">
                <a href="/gea-cream"><div className={this.state.divClass} onMouseOver={this.hoverPhotoIn} onMouseOut={this.hoverPhotoOut}><img className="dyn" src={`${API_SERVER}productphotos/mynawebshop-whitetop-1.jpg`} alt="Gea Knitted Jersey Top" /><p>Gea Knitted Jersey Top <br /><span>€40</span></p></div></a>
                <div className="spacer25px" />
              </div>
              <div className="col-md-6 ce">
                <a href="/nolia-dustpink"><div className={this.state.divClass} onMouseOver={this.hoverPhotoIn} onMouseOut={this.hoverPhotoOut}><img className="dyn" src={`${API_SERVER}productphotos/mynawebshop-pinkdress-1.jpg`} alt="Nolia Woven Dress" /><p>Nolia Woven Dress <br /><span>€170</span></p></div></a>
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
              <div className="col-md-6 ce">
                <a href="/calla-cream"><div className={this.state.divClass} onMouseOver={this.hoverPhotoIn} onMouseOut={this.hoverPhotoOut}><img className="dyn" src={`${API_SERVER}productphotos/mynawebshop-whitejeans-1.jpg`} alt="Calla Denim Pants" /><p>Calla Denim Pants <br /><span>€140</span></p></div></a>
                <div className="spacer25px" />
              </div>
              <div className="col-md-3" />
            </div>
          </div>
          <div className="col-md-2" />
        </div>
        <Footer />
      </Container>
		);
	}
}
