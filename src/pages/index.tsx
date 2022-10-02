import Container from 'react-bootstrap/Container';
import Trans from 'next-translate/Trans';

import Slider from '../components/Slider';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import SingleProductCard from '../components/SingleProductCard';
import usePing from '../lib/use-ping';

import styles from './index.module.css';

import firstImage from '../../public/landing/01.jpg';
import secondImage from '../../public/landing/02.jpg';
import thirdImage from '../../public/landing/03.jpg';
import fourthImage from '../../public/landing/04.jpg';
import fifthImage from '../../public/landing/05.jpg';
import sixthImage from '../../public/landing/06.jpg';
import seventhImage from '../../public/landing/07.jpg';
import eigthImage from '../../public/landing/08.jpg';
import ninthImage from '../../public/landing/09.jpg';

export default function Index() {
  usePing();

  return (
    <Container fluid>
      <Header description="landing-and-default" />
      <Nav />
      <div className="row">
        <div className="col-md-12 noPadding">
          <Slider />
        </div>
      </div>

      <div className="col-md-8 mx-auto">
        <div className="row">
          <div className="col-12 my-auto">
            <Trans
              i18nKey="home:landing-inspiration"
              components={[
                <p className={styles.inspirationalText} />,
                <p
                  className={[styles.inspirationalText, 'text-right'].join(' ')}
                />,
                <br />,
              ]}
            />
          </div>
        </div>
      </div>

      {/* <div className="col-md-6 mx-auto">
              <h1 className="text-center mt-5 mb-3">
                  <Trans
                      i18nKey="home:magic-text-shop-the-looks"
                      components={[<br />]}
                  />
              </h1>
          </div> */}
      <div className="col-md-8 mx-auto">
        <div className="row">
          <SingleProductCard
            className="col-md-4"
            productPageLink="/nolia-blouse"
            productImageLink={firstImage.src}
            productName="NOLIA Blouse"
            price="€119"
            width={firstImage.width}
            height={firstImage.height}
          />
          <SingleProductCard
            className="col-md-4"
            productPageLink="/susan-dress"
            productImageLink={secondImage.src}
            productName="SUSAN Dress"
            price="€249"
            width={secondImage.width}
            height={secondImage.height}
          />
          <SingleProductCard
            className="col-md-4"
            productPageLink="/kamala-trench-coat"
            productImageLink={thirdImage.src}
            productName="KAMALA Trench Coat"
            price="€299"
            width={thirdImage.width}
            height={thirdImage.height}
          />
        </div>
      </div>

      <div className="col-md-6 mx-auto">
        <Trans i18nKey="home:believe-text" components={[<p />]} />
      </div>

      <div className="col-md-8 mx-auto">
        <div className="row">
          <SingleProductCard
            className="col-md-12"
            productPageLink="/lina-hand-painted-scarf"
            productImageLink={fourthImage.src}
            productName="LINA Scarf"
            price="€115"
            width={fourthImage.width}
            height={fourthImage.height}
          />
          <SingleProductCard
            className="col-md-6"
            productPageLink="/lina-hand-painted-scarf"
            productImageLink={fifthImage.src}
            productName=""
            width={fifthImage.width}
            height={fifthImage.height}
          />
          <SingleProductCard
            className="col-md-6"
            productPageLink="/silene-long-coat"
            productImageLink={sixthImage.src}
            productName="SILENE Long Coat"
            price="€260"
            width={sixthImage.width}
            height={sixthImage.height}
          />
        </div>
      </div>

      <div className="col-md-6 mx-auto">
        <Trans i18nKey="home:believe-text-two" components={[<p />]} />
      </div>

      <div className="col-md-8 mx-auto">
        {/* <h1 className="text-center mt-5 mb-3">{t('lookbook-title-caption')}</h1> */}
        <div className="row">
          <SingleProductCard
            className="col-md-12 mx-auto"
            productPageLink="/lookbook"
            productImageLink={seventhImage.src}
            productName="LOOKBOOK"
            width={seventhImage.width}
            height={seventhImage.height}
          />
          <SingleProductCard
            className="col-md-6"
            productPageLink="/shop-collections"
            productImageLink={eigthImage.src}
            productName="Shop The Look"
            width={eigthImage.width}
            height={eigthImage.height}
          />
          <SingleProductCard
            className="col-md-6"
            productPageLink="/zinia-long-skirt"
            productImageLink={ninthImage.src}
            productName="ZINIA Long Skirt"
            price="€149"
            width={ninthImage.width}
            height={ninthImage.height}
          />
        </div>
      </div>

      <div className="col-md-6 mx-auto">
        <Trans i18nKey="home:laning-inspiration-two" components={[<br />]} />
      </div>

      <Footer />
    </Container>
  );
}
