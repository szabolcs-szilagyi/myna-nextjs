import React from 'react';

import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Ping from '../components/Ping';
import Container from 'react-bootstrap/Container';
import SingleProductCard from '../components/SingleProductCard';
import { chunk } from 'lodash';

type Product = {
  link: string,
  mainPhoto: string,
  name: string,
  price: string,
};

function createProductCard(product: Product) {
  if(!product) return (<></>);
  return (
    <SingleProductCard
      productPageLink={product.link}
      productImageLink={product.mainPhoto}
      productName={product.name}
      price={product.price}
    />
  );
}

function groupProducts(products: Product[]) {
  const grouped = chunk(products, 2).map(([firstProduct, secondProduct], i) => {
    return (
      <div key={`${firstProduct.name}-${i}`} className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <div className="row">
            {createProductCard(firstProduct)}
            {createProductCard(secondProduct)}
          </div>
        </div>
        <div className="col-md-2"></div>
      </div>
    );
  });

  return (<>{grouped}</>);
}

export default class Index extends React.Component {
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
            <a href="#love-affair-collection" className="smallFont ce blackFont">Love Affair Collection</a>
          </div>
          <div className="col-md-3" />
        </div>

        <div className="spacer50px" />
        <div className="row">
          <div id="consciously-beautiful" className="col-md-12 ce capitalLetters">
            <h5><strong>Consciously Beautiful</strong></h5>
          </div>
        </div>

        {(groupProducts([
          {
            name: 'LISIA Dress',
            link: 'lisia-dress',
            mainPhoto: '/product_photos/lisia-dress-01.jpg',
            price: '€179'
          },
          {
            name: "SENNA Skirt",
            link: "/senna-skirt",
            mainPhoto: "/product_photos/senna-skirt-01.jpg",
            price: "€135",
          },
          {
            name: "REEVA Denim Jacket",
            link: "/reeva-denim-jacket",
            mainPhoto: "/product_photos/reeva-denim-jacket-01.jpg",
            price: "€159",
          },
          {
            name: "TULI Dress",
            link: "/tuli-dress",
            mainPhoto: "/product_photos/tuli-dress-01.jpg",
            price: "€169"
          },
          {
            name: "LEYA Wrap Dress",
            link: "/leya-wrap-dress",
            mainPhoto: "/product_photos/leya-wrap-dress-01.jpg",
            price: "€319",
          },
          {
            name: "DAHLIA Blouse",
            link: "/dahlia-blouse",
            mainPhoto: "/product_photos/dahlia-blouse-01.jpg",
            price: "€105",
          },
          {
            name: "BELLA Hand Painted Blouse",
            link: "/bella-hand-painted-blouse",
            mainPhoto: "/product_photos/bella-print-01.jpg",
            price: "€129",
          },
          {
            name: "BELLA Blouse",
            link: "/bella-blouse",
            mainPhoto: "/product_photos/bella-blouse-01.jpg",
            price: "€79",
          },
          {
            name: "DELPHI Culottes",
            link: "/delphi-culottes",
            mainPhoto: "/product_photos/delphi-culottes-01.jpg",
            price: "€95",
          },
        ]))}

        <div className="spacer50px" />
        <div className="row">
          <div id="love-and-light" className="col-md-12 ce capitalLetters">
            <h5><strong>Love and Light</strong></h5>
          </div>
        </div>

        {(groupProducts([
          {
            name: "Lotus Woven Dress",
            link: "/lotus-sand",
            mainPhoto: "/product_photos/mynawebshop-whitedress-1.jpg",
            price: "€225",
          },
          {
            link: "/ivy-cream",
            mainPhoto: "/product_photos/mynawebshop-whitetshirt-1.jpg",
            name: "Ivy Knitted Jersey Top",
            price: "€75",
          },
          {
            link: "/aster-green",
            mainPhoto: "/product_photos/mynawebshop-greenpants-1.jpg",
            name: "Aster Green",
            price: "€139",
          },
          {
            link: "/aster-sand",
            mainPhoto: "/product_photos/mynawebshop-linenpants-1.jpg",
            name: "Aster Sand",
            price: "€139",
          },
          {
            link: "/gea-cream",
            mainPhoto: "/product_photos/mynawebshop-whitetop-1.jpg",
            name: "Gea Knitted Jersey Top",
            price: "€75",
          },
          {
            link: "/nolia-dustpink",
            mainPhoto: "/product_photos/mynawebshop-pinkdress-1.jpg",
            name: "Nolia Woven Dress",
            price: "€215",
          },
        ]))}

        <div className="spacer50px" />
        <div className="row">
          <div id="love-affair-collection" className="col-md-12 ce capitalLetters">
            <h5><strong>Love Affair Collection</strong></h5>
          </div>
        </div>

        {(groupProducts([
          {
            link: "/alyss-dress",
            mainPhoto: "/product_photos/mynawebshop-alyssdress-1.jpg",
            name: "Alyss Dress",
            price: "€215",
          },
          {
            link: "/calla-cream",
            mainPhoto: "/product_photos/mynawebshop-whitejeans-1.jpg",
            name: "Calla Denim Pants",
            price: "€155",
          },
          {
            link: "/tilja-top",
            mainPhoto: "/product_photos/mynawebshop-tiljatop-1.jpg",
            name: "Tilia Top",
            price: "€115",
          },
          {
            link: "/magna-scarf",
            mainPhoto: "/product_photos/mynawebshop-magnascarf-1.jpg",
            name: "Magna Scarf",
            price: "€99",
          },
        ]))}

        <Footer />
      </Container>
    );
  }
}
