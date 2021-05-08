import React from 'react';
import Container from 'react-bootstrap/Container';

import Slider from '../components/Slider';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Ping from '../components/Ping';
import SingleProductCard from '../components/SingleProductCard';

import style from './index.module.css';

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
        <div className="row">
          <div className="col-md-12 text-center">
            <h1 className="mt-5 mb-3">OUR LOVED COLLECTIONS</h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="row">
              <SingleProductCard
                className="col-md-4"
                productPageLink="/shop-collections#consciously-beautiful"
                productImageLink="/landing/consciously_beautiful.jpg"
                productName="LEYA Wrap Dress"
              >
                <p className="text-center">Consciously Beautiful<br />Collection</p>
              </SingleProductCard>
              <SingleProductCard
                className="col-md-4"
                productPageLink="/shop-collections#love-and-light"
                productImageLink="/landing/love_and_light.jpg"
                productName="ASTER Green"
              >
                <p className="text-center">Love & Light<br />Collection</p>
              </SingleProductCard>
              <SingleProductCard
                className="col-md-4"
                productPageLink="/shop-collections#love-affair-collection"
                productImageLink="/landing/love_affair.jpg"
                productName="ALYSS Dress"
              >
                <p className="text-center">Love Affair<br />Collection</p>
              </SingleProductCard>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>

        <div className="col-md-6 mx-auto">
          <h1 className="text-center mt-5 mb-3">New consciously beautiful collection</h1>
          <p>We give you small capsule collections, that are timeless and work together over the seasons. We believe in creating items, that you will love for years, pieces that are unique but versatile, they can be worn together to create whole outfit, and you can easily transform from special occasion to casual look.</p>
        </div>
        <div className="row col-md-8 mx-auto px-0">
          <SingleProductCard
            className="col-md-3"
            productPageLink="/senna-skirt"
            productImageLink="/landing/senna_skirt.jpg"
            productName="SENNA Skirt"
            price="€135"
            width={853}
            height={1280}
          />
          <SingleProductCard
            className="col-md-3"
            productPageLink="/lisia-dress"
            productImageLink="/landing/lisia.jpg"
            productName="LISIA Dress"
            price="€179"
            width={853}
            height={1280}
          />
          <SingleProductCard
            className="col-md-3"
            productPageLink="/ivy-cream"
            productImageLink="/landing/ivy.jpg"
            productName="IVY Top"
            price="€75"
            width={853}
            height={1280}
          />
          <SingleProductCard
            className="col-md-3"
            productPageLink="/tuli-dress"
            productImageLink="/landing/tuli_dress.jpg"
            productName="TULI Dress"
            price="€169"
            width={853}
            height={1280}
          />
        </div>

        <div className="col-md-8 mx-auto">
          <h1 className="text-center mt-5 mb-3">IT’S TIME FOR LINEN</h1>
          <div className="row">
            <div className="col-md-6 my-auto order-last">
              <p>Linen is an amazing fabric. It’s not only wonderful to wear, but is also the oldest known, as well as one of the most sustainable! This is why we love it so much and we couldn't miss it.</p>
            </div>
            <SingleProductCard
              className="col-md-3"
              productPageLink="/lili-top-satin"
              productImageLink="/landing/time-for-linen/lili.jpg"
              productName="LILI Top Satin"
              price="€69"
              width={853}
              height={1280}
            />
            <SingleProductCard
              className="col-md-3"
              productPageLink="/iris-vest"
              productImageLink="/landing/time-for-linen/iris.jpg"
              productName="IRIS Vest"
              price="€75"
              width={853}
              height={1280}
            />
          </div>
        </div>

        <div className="col-md-8 mx-auto">
          <h1 className="text-center mt-5 mb-3">FEEL CONNECTED</h1>
          <div className="row">
            <div className="col-md-9">
              <div className="row">
                <div className="row">
                  <div className="col-md-6">
                    <p>The elegance of the tulip lies in its simplicity. We used inspiration for our TULI dress from the petal shape. This A cut pattern flutters every figure. One of the most sustainable Tencel fabric used for this design perfectly reflects the inspiration ensuring comfort & elegance.</p>
                  </div>
                </div>
                <SingleProductCard
                  className="col-md-5 order-first"
                  productPageLink="/tuli-dress"
                  productImageLink="/landing/feel-connected/tulipan.jpg"
                  width={1280}
                  height={853}
                />
              </div>
            </div>
            <SingleProductCard
              className="col-md-3 order-first"
              productPageLink="/tuli-dress"
              productImageLink="/landing/feel-connected/tuli-dress.jpg"
              productName="TULI Dress"
              price="€169"
              width={853}
              height={1280}
            />
          </div>
        </div>

        <div className="col-md-8 mx-auto">
          <h1 className="text-center mt-5 mb-3">OUR ORGANIC COTTON VOILE QUALITY, NATURAL DYE</h1>
          <div className="row">
            <div className="col-md-8 mx-auto order-last">
              <p>Our passion leads us to creativity. Quite organically we met beautiful person and became very good friends. We are honored to work with very talented artist Jola Hardejewicz-Hardy who dedicate her life and passion for art & painting on silk. This time Jola hand-panited for MYNA on organic cotton voile, the finest quality in our collection. Each blouse is different and unique.</p>
            </div>
            <SingleProductCard
              className="col-md-3"
              productPageLink="/bella-blouse"
              productImageLink="/landing/organic-cotton/bella.jpg"
              productName="BELLA Blouse"
              price="€79"
              width={1280}
              height={1280}
            />
            <SingleProductCard
              className="col-md-5 mx-auto"
              productPageLink="/shop-collections#consciously-beautiful"
              productImageLink="/landing/organic-cotton/bella-and-dahlia.jpg"
              productName="BELLA & DAHLIA Tops"
              width={1290}
              height={740}
            />
            <SingleProductCard
              className="col-md-3"
              productPageLink="/dahlia-blouse"
              productImageLink="/landing/organic-cotton/dahlia.jpg"
              productName="DAHLIA Blouse"
              price="€105"
              width={1280}
              height={1280}
            />
          </div>

          <div className="row">
            <div className="col-md-6">
              <SingleProductCard
                className="col-md-12"
                productPageLink="/bella-hand-painted-blouse"
                productImageLink="/product_photos/bella-print-01.jpg"
                productName="BELLA Hand Painted Blouse"
                price="€129"
                width={1280}
                height={1280}
              />
              <div className={`row align-items-center ${style.verticalSpacing}`}>
                <p className="w-100 text-center">Our LEYA dresss is honored by collaborations with two amazing artists. Jola Hardejewicz-Hardy, who hand-painted our prints and Zaritza, singer&song writer, confident liberated feminist who is dedicated to supporting other woman.</p>
              </div>
            </div>

            <div className="col-md-6">
              <div className={`row align-items-center ${style.verticalSpacing}`}>
                <p className="w-100 text-center">“The biggest beauty is, when you know who you are”<br />Zaritza</p>
              </div>
              <SingleProductCard
                className="col-md-12"
                productPageLink="/leya-wrap-dress"
                productImageLink="/landing/leya/anastazia.jpg"
                productName="LEYA Dress"
                price="€319"
                width={1280}
                height={1280}
              />
            </div>
          </div>
        </div>

        <div className="col-md-8 mx-auto">
          <h1 className="text-center mt-5 mb-3">OUR ORGANIC COTTON & HEMP QUALITY</h1>
          <div className="row">
            <div className="col-md-8 mx-auto order-last">
              <p>Sustainability is very important and fashion is no longer only focused on comfort but also its impact on the environment. Our GEA and IVY basic tops are best examples. What do we know:</p>
              <ul>
                <li>HEMP is antibacterial, which means you can wear it longer than other fabrics, before washing,</li>
                <li>no pesticides need to be used to grow it as it is weed,</li>
                <li>at least 50% less water is needed to grow it,</li>
                <li>there are no waste products as the whole plant is used for different purposes.</li>
              </ul>
            </div>
            <SingleProductCard
              className="col-md-3"
              productPageLink="/gea-cream"
              productImageLink="/landing/hemp/MynaWebShop-WhiteTop-3.jpg"
              productName="GEA Top"
              price="€75"
              width={1280}
              height={1280}
            />
            <SingleProductCard
              className="col-md-5 mx-auto"
              productPageLink="/shop-collections#love-and-light"
              productImageLink="/landing/hemp/gea-and-ivy.jpg"
              productName="GEA & IVY Tops"
              width={1290}
              height={740}
            />
            <SingleProductCard
              className="col-md-3"
              productPageLink="/ivy-cream"
              productImageLink="/product_photos/mynawebshop-whitetshirt-1.jpg"
              productName="IVY Top"
              price="€75"
              width={1280}
              height={1280}
            />
          </div>
        </div>

        <div className="col-md-8 mx-auto">
          <h1 className="text-center mt-5 mb-3">STAY INSPIRED WITH MYNA – VIEW OUR LOOKBOOK</h1>
          <div className="row">
            <div className="col-md-6 order-last my-auto">
              <p className={style.quote} >
                She's matured and grown, this time she reflects a balanced elegance of a different summer glow.
                She's nurturing and perceptive, but every now and then she shows her romantic and spontanous side.
              </p>
            </div>
            <SingleProductCard
              className="col-md-6"
              productPageLink="/lookbook"
              productImageLink="/lookbook/08.jpg"
              productName="LOOKBOOK"
              width={1280}
              height={853}
            />
          </div>
        </div>

        <Footer />
      </Container>
    );
  }
}
