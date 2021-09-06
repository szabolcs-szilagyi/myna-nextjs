import React from 'react';
import Container from 'react-bootstrap/Container';
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';

import Slider from '../components/Slider';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Ping from '../components/Ping';
import SingleProductCard from '../components/SingleProductCard';

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
        <h1 className="text-center mt-5 mb-3">{t('New Autumn-Winter transitional & timeless collection')}</h1>
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
        <h1 className="text-center mt-5 mb-3">{t('MYNA-Embroidery')}</h1>
        <div className="row">
          <div className="col-12 col-xl-6 my-auto order-last">
            <Trans
              i18nKey="home:Embroidery in MYNA"
              components={[<p />]}
            />
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
            productPageLink="/magna-scarf"
            productImageLink="/landing/embroidery.jpg"
            productName=""
            price=""
            width={853}
            height={1280}
          />
        </div>
      </div>

      <div className="col-md-8 mx-auto">
        <h1 className="text-center mt-5 mb-3">{t('DIVINE TENCEL')}</h1>
          <div className="col-12">
            <Trans
              i18nKey="home:MYNA-grand-purpose"
              components={[<p />]}
            />
          </div>
          <div className="row">
            <SingleProductCard
              className="col-md-4 mx-auto"
              productPageLink="/marigold-coat"
              productImageLink="/landing/marigold-coat.jpg"
              productName="MARIGOLD Coat"
              price="€225"
              width={853}
              height={1280}
            />
            <SingleProductCard
              className="col-md-4 mx-auto"
              productPageLink="/marigold-coat"
              productImageLink="/landing/marigold-bread.jpg"
              width={853}
              height={1280}
            />
          </div>
      </div>

      <div className="col-md-8 mx-auto">
        <h1 className="text-center mb-3">{t('FRIENDSHIP MYNA')}</h1>
        <div className="row">
          <div className="text-center col-md-8 offset-md-2 order-last">
            <p>
              {t('build-and-create-friendship')}
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

      <div className="col-md-8 mx-auto">
        <h1 className="text-center mt-5 mb-3">{t('STAY INSPIRED WITH MYNA – VIEW OUR LOOKBOOK')}</h1>
        <SingleProductCard
          className="col-md-8 mx-auto"
          productPageLink="/lookbook"
          productImageLink="/landing/view-our-lookbook.jpg"
          productName="LOOKBOOK"
          width={1280}
          height={640}
        />
      </div>

      <Footer />
    </Container>
  );
}
