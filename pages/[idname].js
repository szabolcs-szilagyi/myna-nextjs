import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'next/router'

import {
  API_SERVER,
  desc_cont,
  size_info,
  deli_info,
  prod_descB,
  prod_compB,
  prod_sizeB,
  prod_deliB,
} from '../src/constants';

import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Ping from '../components/Ping';
import Container from 'react-bootstrap/Container';
import PhotoViewer from '../components/PhotoViewer';

import "../src/styles.css";

import Cookies from 'universal-cookie';
const cookies = new Cookies();
const hash = cookies.get('hash');
const session = cookies.get('session');

const DEFAULT_AVAILABLE = 'Available for pre-order';

function loadData(idName) {
  return fetch(API_SERVER + 'listen.php?part=getproductdata&productname=' + idName)
    .then(response => response.json())
		.then(({ productdetails }) => {
      return {
        productIdToCart: productdetails.id,
        productName: productdetails.productname,
        productColor: productdetails.productcolor,
        productPrice: productdetails.productprice,
        description: productdetails.desclong,
        compCare: productdetails.compcare,
        availability: productdetails.availability,
        photos: {
          photo1: productdetails.pic1,
          photo2: productdetails.pic2,
          photo3: productdetails.pic3,
          photo4: productdetails.pic4,
          photo5: productdetails.pic5,
          photo6: productdetails.pic6,
          photo7: productdetails.pic7,
          photo8: productdetails.pic8,
          photo9: productdetails.pic9,
        },
      };
    })
    .catch(error => console.log(error.message));
}

export async function getStaticProps({ params: { idname } }) {
  const props = await loadData(idname);
  return {
    props,
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { idname: 'alyss-dress' } },
      { params: { idname: 'aster-green' } },
      { params: { idname: 'aster-sand' } },
      { params: { idname: 'bella-blouse' } },
      { params: { idname: 'bella-hand-painted-blouse' } },
      { params: { idname: 'calla-cream' } },
      { params: { idname: 'dahlia-blouse' } },
      { params: { idname: 'delphi-culottes' } },
      { params: { idname: 'gea-cream' } },
      { params: { idname: 'iris-vest' } },
      { params: { idname: 'ivy-cream' } },
      { params: { idname: 'leya-wrap-dress' } },
      { params: { idname: 'lili-top' } },
      { params: { idname: 'lili-top-satin' } },
      { params: { idname: 'lisia-dress' } },
      { params: { idname: 'lotus-sand' } },
      { params: { idname: 'nolia-dustpink' } },
      { params: { idname: 'reeva-denim-jacket' } },
      { params: { idname: 'senna-skirt' } },
      { params: { idname: 'tilja-top' } },
      { params: { idname: 'tuli-dress' } },
    ],
    fallback: true
  };
}

function DescButton({ id, text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="border-0 capitalLetters mediumFont blackFont"
      style={{
        'backgroundColor': 'inherit'
      }}
      id={id}
    >{text}</button>
  );
}

class Index extends React.Component {
  constructor(props) {
    super(props);

    const idName = props.router.query.idname;

    this.state = {
      cartButtonVisibility: 'visible',
      addToCart: 'ADD TO CART',
      productIdToCart: '',
      idName,
      currency: '',
      avby: DEFAULT_AVAILABLE,
      productName: '',
      productColor: '',
      productPrice: '',
      description: '',
      compCare: '',
      fade: 'fadeIn',
      visible: false,
      nextPage: '',
      photos: {
        photo1: '',
        photo2: '',
        photo3: '',
        photo4: '',
        photo5: '',
        photo6: '',
        photo7: '',
        photo8: '',
        photo9: '',
      },
      productInfo: '',
      selectedSize: '0',
      ...props
    };

    this.defaultButton = this.defaultButton.bind(this);
    this.checkAvailability = this.checkAvailability.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.loadCurrency = this.loadCurrency.bind(this);
    this.loadData = this.loadData.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.productInfoHandling = this.productInfoHandling.bind(this);
  }

  defaultButton () {
    this.setState({ addToCart: 'ADD TO CART' });
    this.checkAvailability();
  }

  checkAvailability() {
    let size = this.state.selectedSize;
    if (size === '0') return;

    let idName = this.state.idName;
    fetch(API_SERVER + 'listen.php?part=availabilityexact&idname=' + idName + '&size=' + size + '&sessiontoken=' + session)
    .then(response => response.json())
		.then(output => {
      const isAvialable = output && output.availability && output.availability === 1;
      if (isAvialable) {
        this.setState({ avby: DEFAULT_AVAILABLE, cartButtonVisibility: 'visible' });
      } else {
        this.setState({ avby: 'Pre-Order/Contact Us', cartButtonVisibility: 'invisible' });
      }
    })
    .catch(error => console.log(error.message));
  }

  addToCart () {
    if (this.state.addToCart == 'ADD TO CART') {
      let size = this.state.selectedSize;
      if (size != '0') {
        let idName = this.state.idName;
        fetch(API_SERVER + 'listen.php?part=addproducttocart&idname=' + idName + '&size=' + size + '&sessiontoken=' + session)
        .then(response => response.json())
  		  .then(output => {
          let data = output;
          let tmp = data['success'];
        })
        .catch(error => console.log(error.message));
        this.setState({ addToCart: 'ADDED TO CART' });
        setTimeout(this.defaultButton, 3000);
      }
    }
  }

  loadCurrency () {
    fetch(API_SERVER + 'listen.php?part=getcurrency')
    .then(response => response.json())
		.then(output => {
      let data = output;
      let tmp = data['currency'];
      this.setState({ currency: tmp });
    })
    .catch(error => console.log(error.message));
  }

  loadData () {
    fetch(API_SERVER + 'listen.php?part=getproductdata&productname=' + this.state.idName)
    .then(response => response.json())
		.then(({ productdetails }) => {
      this.setState({
        productIdToCart: productdetails.id,
        productName: productdetails.productname,
        productColor: productdetails.productcolor,
        productPrice: productdetails.productprice,
        description: productdetails.desclong,
        compCare: productdetails.compcare,
        availability: productdetails.availability,
        photos: {
          photo1: productdetails.pic1,
          photo2: productdetails.pic2,
          photo3: productdetails.pic3,
          photo4: productdetails.pic4,
          photo5: productdetails.pic5,
          photo6: productdetails.pic6,
          photo7: productdetails.pic7,
          photo8: productdetails.pic8,
          photo9: productdetails.pic9,
        },
      });
    })
    .catch(error => console.log(error.message));
  }

  handleSizeChange (e) {
    this.setState({ selectedSize: e.target.value }, () => { this.checkAvailability(); });
  }

  productInfoHandling(e) {
    const currentId = e.currentTarget.id;
    const {
      description,
      compCare,
    } = this.state;

    if (currentId === 'productDesc') {
      this.setState({ productInfo: description });
    } else if (currentId === 'productComp') {
      this.setState({ productInfo: compCare });
    } else if (currentId === 'productSize') {
      this.setState({ productInfo: size_info });
    } else if (currentId === 'productDeli') {
      this.setState({ productInfo: deli_info });
    }
  }

  componentDidMount() {
    this.loadCurrency();
  }

  render() {
		return (
      <Container fluid>
        <Header />
        <Nav />
        <Ping />
        <div className="spacer50px"></div>
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-10">
            <div className="row" id="productContainer">

              <PhotoViewer
                photos={this.state.photos}
              />

              <div className="col-md-6 ce">
                <div className="row">
                  <div className="col-md-12">
                    <h2 className="capitalLetters">{this.state.productName} | {this.state.productColor} | {this.state.currency}{this.state.productPrice}</h2>
                  </div>
                </div>
                <div className="spacer50px"></div>
                <div className="row">
                  <div className="col-sm-6 col-xl-3">
                    <DescButton
                      onClick={this.productInfoHandling}
                      id="productDesc"
                      text={prod_descB}
                    />
                  </div>
                  <div className="col-sm-6 col-xl-3">
                    <DescButton
                      onClick={this.productInfoHandling}
                      id="productComp"
                      text={prod_compB}
                    />
                  </div>
                  <div className="spacer10px d-none d-sm-block d-xl-none"></div>
                  <div className="col-sm-6 col-xl-3">
                    <DescButton
                      onClick={this.productInfoHandling}
                      id="productSize"
                      text={prod_sizeB}
                    />
                  </div>
                  <div className="col-sm-6 col-xl-3">
                    <DescButton
                      onClick={this.productInfoHandling}
                      id="productDeli"
                      text={prod_deliB}
                    />
                  </div>
                </div>
                <div className="spacer50px"></div>
                <div className="row">
                  <div className="col-md-12">
                    <div
                      className="productInfoContainer"
                      dangerouslySetInnerHTML={{ __html: this.state.productInfo || this.state.description }}
                    ></div>
                  </div>
                </div>

                <div className="spacer50px"></div>
                <div className="row">
                  <div className="col-md-1"></div>
                  <div className="col-md-6 left">
                    <select id="chooseSize" className="sizeButton" value={this.state.selectedSize} onChange={this.handleSizeChange}>
                      <option value="0">CHOOSE SIZE</option>
											<option value="xs">XS</option>
											<option value="s">S</option>
											<option value="m">M</option>
                      <option value="ml">ML</option>
                      <option value="l">L</option>
										</select>
                    <div className="spacer25px"></div>
                    <div className={this.state.cartButtonVisibility}><div className="noBorder mediumFont"><button type="button" className="cartButton" onClick={this.addToCart}>{this.state.addToCart}</button></div></div>
                  </div>
                  <div className="col-md-4">
                    <div className="capitalLetters pad8px">
                      {this.state.avby}
                    </div>
                  </div>
                  <div className="col-md-1"></div>
                </div>
                <div className="spacer25px"></div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="productInfoContainer noBorder mediumFont" dangerouslySetInnerHTML={{ __html: desc_cont }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-1"></div>
        </div>
        <div className="spacer50px"></div>
        <Footer />
      </Container>
    );
  }
}

export default withRouter(Index)
