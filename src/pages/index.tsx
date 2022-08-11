import Container from 'react-bootstrap/Container';
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';

import Slider from '../components/Slider';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import SingleProductCard from '../components/SingleProductCard';
import usePing from '../lib/use-ping';

import styles from './index.module.css';

import firstImage from '../../public/landing/01-liana-hand-painted-blouse.jpg';
import secondImage from '../../public/landing/02-narci-skirt.jpg';
import thirdImage from '../../public/landing/03-raisa-dress.jpg';
import fourthImage from '../../public/landing/04-shop-collection.jpg';
import viewOurLookbook from '../../public/landing/05-lookbook.jpg';

export default function Index() {
  const { t } = useTranslation('home');
  usePing();

  return (
    <Container fluid>
      <Header description="landing-and-default" />
      <Nav />
      <div className="col-12">
        <p className="text-center" style={{
          fontSize: '1.5em',
          color: '#b6664d',
        }}>20% Summer sale! Use promo code summersale20</p>
      </div>
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
                <p className={[styles.inspirationalText, 'text-right'].join(' ')} />,
                <br />
              ]}
            />
          </div>
        </div>
      </div>

      <div className="col-md-6 mx-auto">
        <h1 className="text-center mt-5 mb-3">
          <Trans
            i18nKey="home:magic-text-shop-the-looks"
            components={[<br />]}
          />
        </h1>
      </div>

      <div className="col-md-8 mx-auto">
        <div className="row">
          <SingleProductCard
            className="col-md-6"
            productPageLink="/liana-blouse-sunrise"
            productImageLink={firstImage.src}
            productName="LIANA Blouse Sunrise"
            price="€135"
            width={firstImage.width}
            height={firstImage.height}
          />
          <SingleProductCard
            className="col-md-6"
            productPageLink="/narci-skirt"
            productImageLink={secondImage.src}
            productName="NARCI Skirt"
            price="€160"
            width={secondImage.width}
            height={secondImage.height}
          />
        </div>
      </div>

      <div className="col-md-6 mx-auto">
        <h1 className="text-center mt-5 mb-3">
          <Trans
              i18nKey="home:believe-text"
              components={[<p />]}
          />
        </h1>
      </div>

      <div className="col-md-8 mx-auto">
        <div className="row">
          <SingleProductCard
            className="col-md-12"
            productPageLink="/shop-collections"
            productImageLink={thirdImage.src}
            productName="SHOP COLLECTION"
            width={thirdImage.width}
            height={thirdImage.height}
          />
          <SingleProductCard
            className="col-md-12"
            productPageLink="/shop-collections"
            productImageLink={fourthImage.src}
            productName=""
            width={fourthImage.width}
            height={fourthImage.height}
          />
        </div>
      </div>

      <div className="col-md-8 mx-auto">
        <h1 className="text-center mt-5 mb-3">{t('STAY INSPIRED WITH MYNA – VIEW OUR LOOKBOOK')}</h1>
        <SingleProductCard
          className="col-md-12 mx-auto"
          productPageLink="/lookbook"
          productImageLink={viewOurLookbook.src}
          productName="LOOKBOOK"
          width={viewOurLookbook.width}
          height={viewOurLookbook.height}
        />
      </div>

      <Footer />
    </Container>
  );
}
