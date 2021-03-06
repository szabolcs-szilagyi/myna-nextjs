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

class SingleProduct extends React.Component {
  squareStyle = {
    '--aspect-ratio': '1'
  }

  constructor(props) {
    super(props);

    this.state = {
      divClass: 'cImage'
    };

    this.connectionAlive = this.connectionAlive.bind(this);
    this.hoverPhotoIn = this.hoverPhotoIn.bind(this);
    this.hoverPhotoOut = this.hoverPhotoOut.bind(this);
  }

  connectionAlive() {}

  hoverPhotoIn (e) {
    e.currentTarget.classList.add('cImageHovered');
  }

  hoverPhotoOut (e) {
    e.currentTarget.classList.remove('cImageHovered');
  }

  render() {
    const props = this.props;

    return (
      <div className="col-md-6 ce">
        <div
          className={this.state.divClass}
          onMouseOver={this.hoverPhotoIn}
          onMouseOut={this.hoverPhotoOut}
          style={this.squareStyle}
        >
          <a href={props.productPageLink}>
            <img
              className="dyn"
              src={props.productImageLink}
              alt={props.productName}
            />
            <p>{props.productName}<br /><span>{props.price}</span></p>
          </a>
        </div>
        <div className="spacer25px" />
      </div>
    );
  }
}

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
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="row">
              <SingleProduct
                productPageLink="/reeva-denim-jacket"
                productImageLink={`${API_SERVER}productphotos/reeva-denim-jacket-01.jpg`}
                productName="REEVA Denim Jacket"
                price="€159"
              />
              <SingleProduct
                productPageLink="/senna-skirt"
                productImageLink={`${API_SERVER}productphotos/senna-skirt-01.jpg`}
                productName="SENNA Skirt"
                price="€135"
              />
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>

        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="row">
              <SingleProduct
                productPageLink="/tuli-dress"
                productImageLink={`${API_SERVER}productphotos/tuli-dress-01.jpg`}
                productName="TULI Dress"
                price="€169"
              />
              <SingleProduct
                productPageLink="/leya-wrap-dress"
                productImageLink={`${API_SERVER}productphotos/leya-wrap-dress-01.jpg`}
                productName="LEYA Wrap Dress"
                price="€319"
              />
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>

        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="row">
              <SingleProduct
                productPageLink="/dahlia-blouse"
                productImageLink={`${API_SERVER}productphotos/dahlia-blouse-01.jpg`}
                productName="DAHLIA Blouse"
                price="€105"
              />
              <SingleProduct
                productPageLink="/bella-hand-painted-blouse"
                productImageLink={`${API_SERVER}productphotos/bella-print-01.jpg`}
                productName="BELLA Hand Painted Blouse"
                price="€129"
              />
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="row">
              <SingleProduct
                productPageLink="/bella-blouse"
                productImageLink={`${API_SERVER}productphotos/bella-blouse-01.jpg`}
                productName="BELLA Blouse"
                price="€79"
              />
              <SingleProduct
                productPageLink="/delphi-culottes"
                productImageLink={`${API_SERVER}productphotos/delphi-culottes-01.jpg`}
                productName="DELPHI Culottes"
                price="€95"
              />
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>

        <div className="spacer50px" />
        <div className="row">
          <div id="love-and-light" className="col-md-12 ce capitalLetters">
            <h5><strong>Love and Light</strong></h5>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="row">
              <SingleProduct
                productPageLink="/lotus-sand"
                productImageLink={`${API_SERVER}productphotos/mynawebshop-whitedress-1.jpg`}
                productName="Lotus Woven Dress"
                price="€225"
              />
              <SingleProduct
                productPageLink="/ivy-cream"
                productImageLink={`${API_SERVER}productphotos/mynawebshop-whitetshirt-1.jpg`}
                productName="Ivy Knitted Jersey Top"
                price="€75"
              />
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="row">
              <SingleProduct
                productPageLink="/aster-green"
                productImageLink={`${API_SERVER}productphotos/mynawebshop-greenpants-1.jpg`}
                productName="Aster Green"
                price="€139"
              />
              <SingleProduct
                productPageLink="/aster-sand"
                productImageLink={`${API_SERVER}productphotos/mynawebshop-linenpants-1.jpg`}
                productName="Aster Sand"
                price="€139"
              />
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="row">
              <SingleProduct
                productPageLink="/gea-cream"
                productImageLink={`${API_SERVER}productphotos/mynawebshop-whitetop-1.jpg`}
                productName="Gea Knitted Jersey Top"
                price="€75"
              />
              <SingleProduct
                productPageLink="/nolia-dustpink"
                productImageLink={`${API_SERVER}productphotos/mynawebshop-pinkdress-1.jpg`}
                productName="Nolia Woven Dress"
                price="€215"
              />
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>

        <div className="spacer50px" />
        <div className="row">
          <div id="autumn-collection" className="col-md-12 ce capitalLetters">
            <h5><strong>Autumn Collection</strong></h5>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="row">
              <SingleProduct
                productPageLink="/alyss-dress"
                productImageLink={`${API_SERVER}productphotos/mynawebshop-alyssdress-1.jpg`}
                productName="Alyss Dress"
                price="€215"
              />
              <SingleProduct
                productPageLink="/calla-cream"
                productImageLink={`${API_SERVER}productphotos/mynawebshop-whitejeans-1.jpg`}
                productName="Calla Denim Pants"
                price="€155"
              />
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="row">
              <SingleProduct
                productPageLink="/tilja-top"
                productImageLink={`${API_SERVER}productphotos/mynawebshop-tiljatop-1.jpg`}
                productName="Tilia Top"
                price="€115"
              />
              <SingleProduct
                productPageLink="/magna-scarf"
                productImageLink={`${API_SERVER}productphotos/mynawebshop-magnascarf-1.jpg`}
                productName="Magna Scarf"
                price="€99"
              />
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>

        <Footer />
      </Container>
    );
  }
}
