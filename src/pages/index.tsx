import React from 'react';
import Container from 'react-bootstrap/Container';
import useTranslation from 'next-translate/useTranslation'

import Slider from '../components/Slider';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Ping from '../components/Ping';
import SingleProductCard from '../components/SingleProductCard';

import style from './index.module.css';

export default function Index() {
  const { t } = useTranslation('home');

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
          <h1 className="mt-5 mb-3">{t('OUR LOVED COLLECTIONS')}</h1>
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
              <p className="text-center">Consciously Beautiful<br />{t('Collection')}</p>
            </SingleProductCard>
            <SingleProductCard
              className="col-md-4"
              productPageLink="/shop-collections#love-and-light"
              productImageLink="/landing/love_and_light.jpg"
              productName="ASTER Green"
            >
              <p className="text-center">Love & Light<br />{t('Collection')}</p>
            </SingleProductCard>
            <SingleProductCard
              className="col-md-4"
              productPageLink="/shop-collections#love-affair-collection"
              productImageLink="/landing/love_affair.jpg"
              productName="ALYSS Dress"
            >
              <p className="text-center">Love Affair<br />{t('Collection')}</p>
            </SingleProductCard>
          </div>
        </div>
        <div className="col-md-2"></div>
      </div>

      <div className="col-md-6 mx-auto">
        <h1 className="text-center mt-5 mb-3">{t('New consciously beautiful collection')}</h1>
        <p>{t('sustainability:we-give-you-small-capsule-collections')}</p>
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
        <h1 className="text-center mt-5 mb-3">{t('IT’S TIME FOR LINEN')}</h1>
        <div className="row">
          <div className="col-md-6 my-auto order-last">
            <p>{t('linen-is-an-amazing-fabric')}</p>
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
        <h1 className="text-center mt-5 mb-3">{t('FEEL CONNECTED')}</h1>
        <div className="row">
          <div className="col-md-9">
            <div className="row">
              <div className="row">
                <div className="col-md-6">
                  <p>{t('the-elegance-of-the-tulip')}</p>
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
        <h1 className="text-center mt-5 mb-3">{t('OUR ORGANIC COTTON VOILE QUALITY, NATURAL DYE')}</h1>
        <div className="row">
          <div className="col-md-8 mx-auto order-last">
            <p>{t('our-passion-leads-us-to-creativity')}</p>
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
              <p className="w-100 text-center">{t('our-leya-dresss-is-honored')}</p>
            </div>
          </div>

          <div className="col-md-6">
            <div className={`row align-items-center ${style.verticalSpacing}`}>
              <p className="w-100 text-center">{t('the-biggest-beauty')}<br />Zaritza</p>
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
        <h1 className="text-center mt-5 mb-3">{t('OUR ORGANIC COTTON & HEMP QUALITY')}</h1>
        <div className="row">
          <div className="col-md-8 mx-auto order-last">
            <p>{t('sustainability-is-very-important-and-fashion')}</p>
            <ul>
              <li>{t('hemp-is-antibacterial')}</li>
              <li>{t('no-pesticides-need')}</li>
              <li>{t('less-water-is-needed')}</li>
              <li>{t('there-are-no-waste')}</li>
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
        <h1 className="text-center mt-5 mb-3">{t('STAY INSPIRED WITH MYNA – VIEW OUR LOOKBOOK')}</h1>
        <div className="row">
          <div className="col-md-6 order-last my-auto">
            <p className={style.quote} >
              {t('common:lookbook-shes-matured')}
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
