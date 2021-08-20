import React, { useState } from 'react';

import {
  API_SERVER,
  API_PATH,
} from '../constants';

import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Ping from '../components/Ping';
import Container from 'react-bootstrap/Container';
import PhotoViewer from '../components/PhotoViewer';
import ProductInfo from '../components/ProductInfo';

import Cookies from 'universal-cookie';
import { useRouter } from 'next/router';
const cookies = new Cookies();
const session = cookies.get('session');

const DEFAULT_AVAILABLE = 'Available for pre-order';

function loadData(idName: string): Promise<unknown> {
  return fetch(API_SERVER + API_PATH + '?part=getproductdata&productname=' + idName)
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
        isOneSize: productdetails.is_one_size,
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
      { params: { idname: 'magna-scarf' } },
    ],
    fallback: true
  };
}


export default function Index (props: any) {
  const router = useRouter();
    const idName = router.query.idname;
    const isOneSize = props.isOneSize;

    const [state, setState] = useState({
      cartButtonVisibility: 'visible',
      addToCart: 'ADD TO CART',
      productIdToCart: '',
      idName,
      currency: '€',
      avby: DEFAULT_AVAILABLE,
      productName: '',
      productColor: '',
      productPrice: '',
      description: '',
      compCare: '',
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
      lastItemsDate: null,
      ...props
    });
  const [selectedSize, setSelectedSize] = useState(isOneSize ? 'one_size' : '0');

  function defaultButton() {
    setState({
      ...state,
      addToCart: 'ADD TO CART',
    });
    checkAvailability(selectedSize, session, state.idName);
  }

  function checkAvailability(size: string, session: string, idName: string) {
    if (size === '0') return;

    fetch(API_SERVER + API_PATH + '?part=availabilityexact&idname=' + idName + '&size=' + size + '&sessiontoken=' + session)
    .then(response => response.json())
		.then(output => {
      const availability = output && output.availability;
      if (availability > 0) {
        setState({
          ...state,
          avby: DEFAULT_AVAILABLE,
          cartButtonVisibility: 'visible',
        });
      } else if(availability === 0) {
        setState({
          ...state,
          avby: 'Pre-Order / Contact Us',
          cartButtonVisibility: 'invisible',
        });
      } else if(availability === null) {
        setState({
          ...state,
          avby: 'Not Available',
          cartButtonVisibility: 'invisible',
        });
      }
    })
    .catch(error => console.log(error.message));
  }

  function addToCart() {
    if (state.addToCart == 'ADD TO CART') {
      let size = selectedSize;
      if (size != '0') {
        let idName = state.idName;
        fetch(API_SERVER + API_PATH + '?part=addproducttocart&idname=' + idName + '&size=' + size + '&sessiontoken=' + session)
        .then(response => response.json())
  		  .then(output => {
          let data = output;
          let tmp = data['success'];
        })
        .catch(error => console.log(error.message));
        setState({
          ...state,
          addToCart: 'ADDED TO CART',
          lastItemsDate: Date.now(),
        });
        setTimeout(defaultButton, 3000);
      }
    }
  }

  function loadData() {
    fetch(API_SERVER + API_PATH + '?part=getproductdata&productname=' + state.idName)
    .then(response => response.json())
		.then(({ productdetails }) => {
      setState({
        ...state,
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

  function handleSizeChange(e) {
    const newSize = e.target.value
    setSelectedSize(newSize);
    checkAvailability(newSize, session, state.idName);
  }

		return (
      <Container fluid>
        <Header />
        <Nav lastItemsDate={state.lastItemsDate} />
        <Ping />
        <div className="spacer50px"></div>
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-10">
            <div className="row">

              <PhotoViewer
                photos={state.photos}
              />

              <div className="col-md-6 ce">
                <div className="row">
                  <div className="col-md-12">
                    <h1 className="capitalLetters">{state.productName} | {state.productColor} | {state.currency}{state.productPrice}</h1>
                  </div>
                </div>
                <div className="spacer50px"></div>

                <ProductInfo
                  description={state.description}
                  compCare={state.compCare}
                />

                <div className="spacer50px"></div>
                <div className="row">
                  <div className="col-md-1"></div>
                  <div className="col-md-6 left">
                    <select
                      id="chooseSize"
                      className={state.isOneSize ?
                                 'sizeButton invisible' :
                                 'sizeButton'}
                      value={selectedSize}
                      onChange={handleSizeChange}
                    >
                      <option value="0">CHOOSE SIZE</option>
                      <option value="xs">XS</option>
                      <option value="s">S</option>
                      <option value="m">M</option>
                      <option value="ml">ML</option>
                      <option value="l">L</option>
										</select>
                    <div className="spacer25px"></div>
                    <div className={state.cartButtonVisibility}>
                      <div className="noBorder mediumFont">
                        <button
                          type="button"
                          className="cartButton"
                          onClick={addToCart}
                        >{state.addToCart}</button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="capitalLetters pad8px">
                      {state.avby}
                    </div>
                  </div>
                  <div className="col-md-1"></div>
                </div>
                <div className="spacer25px"></div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="productInfoContainer noBorder mediumFont">
                      <div className="mediumFont ju">
                        Each item is created by our talented creative director Justyna and handmade
                        with care in Poland. If you cannot find your size, get in touch with us and
                        we will do our best to help. Email us on <a href="mailto:connect@mynalabel.com" className="blackFont">connect@mynalabel.com</a> or click <a className="blackFont" href="/shipping">here</a> for more information about orders.
                      </div>
                    </div>
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
