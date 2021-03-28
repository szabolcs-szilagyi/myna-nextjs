import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import { API_SERVER } from '../constants';
import Slider from '../components/Slider';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Ping from '../components/Ping';
import SingleProductCard from '../components/SingleProductCard';

import Cookies from 'universal-cookie';
const cookies = new Cookies();
const hash = cookies.get('hash');

export default class Index extends React.Component {
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
              <SingleProductCard
                productPageLink="/leya-wrap-dress"
                productImageLink="/product_photos/leya-wrap-dress-01.jpg"
                productName="LEYA Wrap Dress"
                price="€319"
              />
              <SingleProductCard
                productPageLink="/dahlia-blouse"
                productImageLink="/product_photos/dahlia-blouse-01.jpg"
                productName="DAHLIA Blouse"
                price="€105"
              />
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="row">
              <SingleProductCard
                productPageLink="/tuli-dress"
                productImageLink="/product_photos/tuli-dress-03.jpg"
                productName="TULI Dress"
                price="€169"
              />
              <SingleProductCard
                productPageLink="/bella-hand-painted-blouse"
                productImageLink="/product_photos/bella-print-01.jpg"
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
              <SingleProductCard
                productPageLink="/reeva-denim-jacket"
                productImageLink="/product_photos/reeva-denim-jacket-01.jpg"
                productName="REEVA Denim Jacket"
                price="€159"
              />
              <SingleProductCard
                productPageLink="/senna-skirt"
                productImageLink="/product_photos/senna-skirt-01.jpg"
                productName="SENNA Skirt"
                price="€135"
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
