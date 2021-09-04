import React from 'react';
import Container from 'react-bootstrap/Container';
import useTranslation from 'next-translate/useTranslation';

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

      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="row justify-content-center">
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
          </div>
        </div>
      </div>

      <div className="col-md-6 mx-auto">
        <h1 className="text-center mt-5 mb-3">{t('New consciously beautiful collection')}</h1>
        <p>{t('sustainability:we-give-you-small-capsule-collections')}</p>
      </div>
      <div className="row col-md-8 mx-auto px-0">
        <SingleProductCard
          className="col-md-3"
          productPageLink="/flora-dress"
          productImageLink="/landing/flora_dress.jpg"
          productName="FLORA Dress"
          price="€229"
          width={853}
          height={1280}
        />
        <SingleProductCard
          className="col-md-3"
          productPageLink="/reeva-denim-jacket"
          productImageLink="/landing/reeva-denim-jacket.jpg"
          productName="REEVA Jacket"
          price="€139"
          width={853}
          height={1280}
        />
        <SingleProductCard
          className="col-md-3"
          productPageLink="/lola-top"
          productImageLink="/landing/lola-top.jpg"
          productName="LOLA Top"
          price="€149"
          width={853}
          height={1280}
        />
        <SingleProductCard
          className="col-md-3"
          productPageLink="/helen-blazer"
          productImageLink="/landing/helen-blazer.jpg"
          productName="HELEN Blazer"
          price="€225"
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
            productPageLink="/peri-top"
            productImageLink="/landing/peri-top.jpg"
            productName="PERI Top"
            price="€155"
            width={853}
            height={1280}
          />
          <SingleProductCard
            className="col-md-3"
            productPageLink=""
            productImageLink="/landing/embroidery.jpg"
            productName=""
            price=""
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
                productPageLink="/marigold-coat"
                productImageLink="/landing/marigold-bread.jpg"
                width={853}
                height={1280}
              />
            </div>
          </div>
          <SingleProductCard
            className="col-md-3 order-first"
            productPageLink="/marigold-coat"
            productImageLink="/landing/marigold-coat.jpg"
            productName="MARIGOLD Coat"
            price="€225"
            width={853}
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
            productImageLink="/landing/walk.jpg"
            productName="LOOKBOOK"
            width={1280}
            height={853}
          />
          <SingleProductCard
            className="col-md-6"
            productPageLink="/lookbook"
            productImageLink="/landing/jump.jpg"
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
