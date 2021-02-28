import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Link from 'next/link';
import { useRouter } from "next/router";
import {API_SERVER as API_SERVER} from '../src/constants';
import {desc_cont as desc_cont} from '../src/constants';
import {size_info as size_info} from '../src/constants';
import {deli_info as deli_info} from '../src/constants';
import {prod_descB as prod_descB} from '../src/constants';
import {prod_compB as prod_compB} from '../src/constants';
import {prod_sizeB as prod_sizeB} from '../src/constants';
import {prod_deliB as prod_deliB} from '../src/constants';
import Cookies from 'universal-cookie';
//import UserMenu from '../components/UserMenu';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Ping from '../components/Ping';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Modal from 'react-awesome-modal';
//import 'bootstrap/dist/css/bootstrap.min.css';
import "../src/styles.css";
const cookies = new Cookies();
const hash = cookies.get('hash');
const session = cookies.get('session');

const DEFAULT_AVAILABLE = 'Available for pre-order';

export default class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cartButtonVisibility: 'visible',
      addToCart: 'ADD TO CART',
      productIdToCart: '',
      idName: 'bella-blouse',
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
      photo1: '',
      photo2: '',
      photo3: '',
      photo4: '',
      photo5: '',
      photo6: '',
      photo7: '',
      photo8: '',
      photo9: '',
      productInfo: '',
      selectedSize: '0'
    };

    this.defaultButton = this.defaultButton.bind(this);
    this.checkAvailability = this.checkAvailability.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.checkSession = this.checkSession.bind(this);
    this.startSession = this.startSession.bind(this);
    this.handleCart = this.handleCart.bind(this);
    this.loadCurrency = this.loadCurrency.bind(this);
    this.loadData = this.loadData.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.productInfoHandling = this.productInfoHandling.bind(this);
    this.productPhotoHandling = this.productPhotoHandling.bind(this);
    this.fadeOut = this.fadeOut.bind(this);
    this.fadeIn = this.fadeIn.bind(this);
    this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);

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
  checkSession () {

  }
  startSession () {

  }
  handleCart () {

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
		.then(output => {
      let data = output;
      let id = data['productdetails']['id'];
      let availability = data['productdetails']['availability'];
      let productName = data['productdetails']['productname'];
      let productColor = data['productdetails']['productcolor'];
      let productPrice = data['productdetails']['productprice'];
      let description = data['productdetails']['desclong'];
      let compCare = data['productdetails']['compcare'];
      let photo1 = data['productdetails']['pic1'];
      let photo2 = data['productdetails']['pic2'];
      let photo3 = data['productdetails']['pic3'];
      let photo4 = data['productdetails']['pic4'];
      let photo5 = data['productdetails']['pic5'];
      let photo6 = data['productdetails']['pic6'];
      let photo7 = data['productdetails']['pic7'];
      let photo8 = data['productdetails']['pic8'];
      let photo9 = data['productdetails']['pic9'];
      this.setState({ productIdToCart: id,
                      productName: productName,
                      productColor: productColor,
                      productPrice: productPrice,
                      description: description,
                      compCare: compCare,
                      productInfo: description,
                      availability: 0,
                      photo1: API_SERVER + 'productphotos/' + photo1,
                      photo2: API_SERVER + 'productphotos/' + photo2,
                      photo3: API_SERVER + 'productphotos/' + photo3,
                      photo4: API_SERVER + 'productphotos/' + photo4,
                      photo5: API_SERVER + 'productphotos/' + photo5,
                      photo6: API_SERVER + 'productphotos/' + photo6,
                      photo7: API_SERVER + 'productphotos/' + photo7,
                      photo8: API_SERVER + 'productphotos/' + photo8,
                      photo9: API_SERVER + 'productphotos/' + photo9
      });
    })
    .catch(error => console.log(error.message));
  }
  handleSizeChange (e) {
    this.setState({ selectedSize: e.target.value }, () => { this.checkAvailability(); });
  }
  productInfoHandling(e) {
    let desc = this.state.description;
    let compCare = this.state.compCare;
    let prName = this.state.productInfo;
    let currentId = e.currentTarget.id;
    if (currentId == 'productDesc') {
      this.setState({
  			productInfo: desc
  		});
    }
    if (currentId == 'productComp') {
      this.setState({
  			productInfo: compCare
  		});
    }
    if (currentId == 'productSize') {
      this.setState({
  			productInfo: size_info
  		});
    }
    if (currentId == 'productDeli') {
      this.setState({
  			productInfo: deli_info
  		});
    }
  }
  productPhotoHandling(e) {
    let currentId = e.currentTarget.id;
    let tmp1 = this.state.photo1;
    let tmp2;
    if (currentId == 'photo1') { this.openModal(); } else { this.fadeOut (); setTimeout(this.fadeIn, 100); }
    if (currentId == 'photo2') {
      tmp2 = this.state.photo2;
      this.setState({ photo1: tmp2, photo2: tmp1 });
    }
    if (currentId == 'photo3') {
      tmp2 = this.state.photo3;
      this.setState({ photo1: tmp2, photo3: tmp1 });
    }
    if (currentId == 'photo4') {
      tmp2 = this.state.photo4;
      this.setState({ photo1: tmp2, photo4: tmp1 });
    }
  }
  fadeOut () {
    this.setState({ fade: 'fadeNone' });
  }
  fadeIn () {
    this.setState({ fade: 'fadeIn' });
  }
  openModal() {
		this.setState({
			visible : true
		});
	}
	closeModal() {
		this.setState({
			visible : false
		});
	}

  componentDidUpdate() {
  }
  componentDidMount() {
    this.loadCurrency ();
    this.loadData ();
  }
  render() {
		return (
			<Container fluid>
      <Header />
        <Nav />
        <Ping />
        <div className="spacer50px" />
        <div className="row">
          <div className="col-md-1" />
          <div className="col-md-10">
            <div className="row" id="productContainer">
              <div className="col-md-6 ce">
                <div className="row">
                  <div className="col-md-12" id={this.state.fade}>
                    <img src={ this.state.photo1 } onClick={this.productPhotoHandling} className="pointer bigProductPhoto" id="photo1" width="450" height="450" />
                  </div>
                </div>
                <div className="spacer50px" />
                <div className="row">
                  <div className="col-md-12">
                  <div className="w500 marginAuto">
                  <div className="row">
                    <div className="col-md-4 ce inl">
                      <img src={ this.state.photo2 } onClick={this.productPhotoHandling} className="pointer smallProductPhoto" id="photo2" width="150" height="150" />
                    </div>
                    <div className="col-md-4 ce inl">
                      <img src={ this.state.photo3 } onClick={this.productPhotoHandling} className="pointer smallProductPhoto" id="photo3" width="150" height="150" />
                    </div>
                    <div className="col-md-4 ce inl">
                      <img src={ this.state.photo4 } onClick={this.productPhotoHandling} className="pointer smallProductPhoto" id="photo4" width="150" height="150" />
                    </div>
                  </div>
                  </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 ce">
                <div className="row">
                  <div className="col-md-12">
                    <h2 className="capitalLetters">{this.state.productName} | {this.state.productColor} | {this.state.currency}{this.state.productPrice}</h2>
                  </div>
                </div>
                <div className="spacer50px" />
                <div className="row">
                  <div className="col-md-3">
                    <a href="#" onClick={this.productInfoHandling} className="capitalLetters mediumFont blackFont" id="productDesc">{prod_descB}</a>
                  </div>
                  <div className="col-md-4">
                    <a href="#" onClick={this.productInfoHandling} className="capitalLetters mediumFont blackFont" id="productComp">{prod_compB}</a>
                  </div>
                  <div className="col-md-2">
                    <a href="#" onClick={this.productInfoHandling} className="capitalLetters mediumFont blackFont" id="productSize">{prod_sizeB}</a>
                  </div>
                  <div className="col-md-3">
                    <a href="#" onClick={this.productInfoHandling} className="capitalLetters mediumFont blackFont" id="productDeli">{prod_deliB}</a>
                  </div>
                </div>
                <div className="spacer50px" />
                <div className="row">
                  <div className="col-md-12">
                    <div className="productInfoContainer" dangerouslySetInnerHTML={{ __html: this.state.productInfo }}></div>
                  </div>
                </div>
                <div className="spacer50px" />
                <div className="row">
                  <div className="col-md-1" />
                  <div className="col-md-6 left">
                    <select id="chooseSize" className="sizeButton" value={this.state.selectedSize} onChange={this.handleSizeChange}>
                      <option value="0">CHOOSE SIZE</option>
											<option value="xs">XS</option>
											<option value="s">S</option>
											<option value="m">M</option>
                      <option value="ml">ML</option>
                      <option value="l">L</option>
										</select>
                    <div className="spacer25px" />
                    <div className={this.state.cartButtonVisibility}><div className="noBorder mediumFont"><button type="button" className="cartButton" onClick={this.addToCart}>{this.state.addToCart}</button></div></div>
                  </div>
                  <div className="col-md-4">
                    <div className="capitalLetters pad8px">
                      {this.state.avby}
                    </div>
                  </div>
                  <div className="col-md-1" />
                </div>
                <div className="spacer25px" />
                <div className="row">
                  <div className="col-md-12">
                    <div className="productInfoContainer noBorder mediumFont" dangerouslySetInnerHTML={{ __html: desc_cont }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-1" />
        </div>
        <div className="spacer50px" />
        <Footer />
          <Modal
              visible={this.state.visible}
              width="800"
              height="800"
              effect="fadeInUp"
              onClickAway={() => this.closeModal()}
            >
            <div>
              <img src={ this.state.photo1 } width="800" height="800" />
            </div>
          </Modal>
      </Container>
		);
	}
}
