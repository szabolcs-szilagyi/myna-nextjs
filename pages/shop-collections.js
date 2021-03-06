import React, { useState } from 'react';
import ReactDOM from 'react-dom';
//import { useRouter } from 'next/router';
import { API_SERVER } from '../src/constants';
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
            <h2><strong>Shop Collections</strong></h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3" />
          <div className="col-md-2 ce capitalLetters">
            <a href="#consciously-beautiful" className="smallFont ce blackFont">Consciously Beautiful</a>
          </div>
          <div className="col-md-2 ce capitalLetters">
            <a href="#love-and-light" className="smallFont ce blackFont">Love and Light</a>
          </div>
          <div className="col-md-2 ce capitalLetters">
            <a href="#autumn-collection" className="smallFont ce blackFont">Autumn Collection</a>
          </div>
          <div className="col-md-3" />
        </div>

        <div className="spacer50px" />
        <div className="row">
          <div id="consciously-beautiful" className="col-md-12 ce capitalLetters">
            <h5><strong>Consciously Beautiful</strong></h5>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2" />
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-6 ce">
                <a href="/reeva-denim-jacket"><div className={this.state.divClass} onMouseOver={this.hoverPhotoIn} onMouseOut={this.hoverPhotoOut}><img className="dyn" src={`${API_SERVER}productphotos/reeva-denim-jacket-01.jpg`} alt="REEVA Denim Jacket" /><p>REEVA Denim Jacket <br /><span>€159</span></p></div></a>
                <div className="spacer25px" />
              </div>
              <div className="col-md-6 ce">
                <a href="/senna-skirt"><div className={this.state.divClass} onMouseOver={this.hoverPhotoIn} onMouseOut={this.hoverPhotoOut}><img className="dyn" src={`${API_SERVER}productphotos/senna-skirt-01.jpg`} alt="SENNA Skirt" /><p>SENNA Skirt <br /><span>€135</span></p></div></a>
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
                <a href="/tuli-dress"><div className={this.state.divClass} onMouseOver={this.hoverPhotoIn} onMouseOut={this.hoverPhotoOut}><img className="dyn" src={`${API_SERVER}productphotos/tuli-dress-01.jpg`} alt="TULI Dress" /><p>TULI Dress <br /><span>€169</span></p></div></a>
                <div className="spacer25px" />
              </div>
              <div className="col-md-6 ce">
                <a href="/leya-wrap-dress"><div className={this.state.divClass} onMouseOver={this.hoverPhotoIn} onMouseOut={this.hoverPhotoOut}><img className="dyn" src={`${API_SERVER}productphotos/leya-wrap-dress-01.jpg`} alt="LEYA Wrap Dress" /><p>LEYA Wrap Dress <br /><span>€319</span></p></div></a>
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
                <a href="/dahlia-blouse"><div className={this.state.divClass} onMouseOver={this.hoverPhotoIn} onMouseOut={this.hoverPhotoOut}><img className="dyn" src={`${API_SERVER}productphotos/dahlia-blouse-01.jpg`} alt="DAHLIA Blouse" /><p>DAHLIA Blouse <br /><span>€105</span></p></div></a>
                <div className="spacer25px" />
              </div>
              <div className="col-md-6 ce">
                <a href="/bella-hand-painted-blouse"><div className={this.state.divClass} onMouseOver={this.hoverPhotoIn} onMouseOut={this.hoverPhotoOut}><img className="dyn" src={`${API_SERVER}productphotos/bella-print-01.jpg`} alt="BELLA Hand Painted Blouse" /><p>BELLA Hand Painted Blouse <br /><span>€129</span></p></div></a>
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
                <a href="/bella-blouse"><div className={this.state.divClass} onMouseOver={this.hoverPhotoIn} onMouseOut={this.hoverPhotoOut}><img className="dyn" src={`${API_SERVER}productphotos/bella-blouse-01.jpg`} alt="BELLA Blouse" /><p>BELLA Blouse <br /><span>€79</span></p></div></a>
                <div className="spacer25px" />
              </div>
              <div className="col-md-6 ce">
                <a href="/delphi-culottes"><div className={this.state.divClass} onMouseOver={this.hoverPhotoIn} onMouseOut={this.hoverPhotoOut}><img className="dyn" src={`${API_SERVER}productphotos/delphi-culottes-01.jpg`} alt="DELPHI Culottes" /><p>DELPHI Culottes <br /><span>€95</span></p></div></a>
                <div className="spacer25px" />
              </div>
            </div>
          </div>
          <div className="col-md-2" />
        </div>

        <div className="spacer50px" />
        <div className="row">
          <div id="love-and-light" className="col-md-12 ce capitalLetters">
            <h5><strong>Love and Light</strong></h5>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2" />
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-6 ce">
                <a href="/lotus-sand"><div className={this.state.divClass} onMouseOver={this.hoverPhotoIn} onMouseOut={this.hoverPhotoOut}><img className="dyn" src={`${API_SERVER}productphotos/mynawebshop-whitedress-1.jpg`} alt="Lotus Woven Dress" /><p>Lotus Woven Dress <br /><span>€225</span></p></div></a>
                <div className="spacer25px" />
              </div>
              <div className="col-md-6 ce">
                <a href="/ivy-cream"><div className={this.state.divClass} onMouseOver={this.hoverPhotoIn} onMouseOut={this.hoverPhotoOut}><img className="dyn" src={`${API_SERVER}productphotos/mynawebshop-whitetshirt-1.jpg`} alt="Ivy Knitted Jersey Top" /><p>Ivy Knitted Jersey Top <br /><span>€75</span></p></div></a>
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
                <a href="/aster-green"><div className={this.state.divClass} onMouseOver={this.hoverPhotoIn} onMouseOut={this.hoverPhotoOut}><img className="dyn" src={`${API_SERVER}productphotos/mynawebshop-greenpants-1.jpg`} alt="Aster Green" /><p>Aster Woven Culotte Pants <br /><span>€139</span></p></div></a>
                <div className="spacer25px" />
              </div>
              <div className="col-md-6 ce">
                <a href="/aster-sand"><div className={this.state.divClass} onMouseOver={this.hoverPhotoIn} onMouseOut={this.hoverPhotoOut}><img className="dyn" src={`${API_SERVER}productphotos/mynawebshop-linenpants-1.jpg`} alt="Aster Sand" /><p>Aster Woven Culotte Pants <br /><span>€139</span></p></div></a>
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
                <a href="/gea-cream"><div className={this.state.divClass} onMouseOver={this.hoverPhotoIn} onMouseOut={this.hoverPhotoOut}><img className="dyn" src={`${API_SERVER}productphotos/mynawebshop-whitetop-1.jpg`} alt="Gea Knitted Jersey Top" /><p>Gea Knitted Jersey Top <br /><span>€75</span></p></div></a>
                <div className="spacer25px" />
              </div>
              <div className="col-md-6 ce">
                <a href="/nolia-dustpink"><div className={this.state.divClass} onMouseOver={this.hoverPhotoIn} onMouseOut={this.hoverPhotoOut}><img className="dyn" src={`${API_SERVER}productphotos/mynawebshop-pinkdress-1.jpg`} alt="Nolia Woven Dress" /><p>Nolia Woven Dress <br /><span>€215</span></p></div></a>
                <div className="spacer25px" />
              </div>
            </div>
          </div>
          <div className="col-md-2" />
        </div>

        <div className="spacer50px" />
        <div className="row">
          <div id="autumn-collection" className="col-md-12 ce capitalLetters">
            <h5><strong>Autumn Collection</strong></h5>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2" />
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-6 ce">
                <a href="/alyss-dress"><div className={this.state.divClass} onMouseOver={this.hoverPhotoIn} onMouseOut={this.hoverPhotoOut}><img className="dyn" src={`${API_SERVER}productphotos/mynawebshop-alyssdress-1.jpg`} alt="Alyss Dress" /><p>ALYSS dress <br /><span>€215</span></p></div></a>
                <div className="spacer25px" />
              </div>
              <div className="col-md-6 ce">
                <a href="/calla-cream"><div className={this.state.divClass} onMouseOver={this.hoverPhotoIn} onMouseOut={this.hoverPhotoOut}><img className="dyn" src={`${API_SERVER}productphotos/mynawebshop-whitejeans-1.jpg`} alt="Calla Denim Pants" /><p>Calla Denim Pants <br /><span>€155</span></p></div></a>
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
                <a href="/tilja-top"><div className={this.state.divClass} onMouseOver={this.hoverPhotoIn} onMouseOut={this.hoverPhotoOut}><img className="dyn" src={`${API_SERVER}productphotos/mynawebshop-tiljatop-1.jpg`} alt="Tilia Top" /><p>TILIA top <br /><span>€115</span></p></div></a>
                <div className="spacer25px" />
              </div>
              <div className="col-md-6 ce">
                <a href="/magna-scarf"><div className={this.state.divClass} onMouseOver={this.hoverPhotoIn} onMouseOut={this.hoverPhotoOut}><img className="dyn" src={`${API_SERVER}productphotos/mynawebshop-magnascarf-1.jpg`} alt="Magna Scarf" /><p>MAGNA scarf <br /><span>€99</span></p></div></a>
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
