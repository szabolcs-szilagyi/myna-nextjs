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

import firstImage from '../../public/landing/01-viola-dress.jpg';
import secondImage from '../../public/landing/02-susan-dress.jpg';
import thirdImage from '../../public/landing/03-shop-collection.jpg';
import fourthImage from '../../public/landing/04-img_7629.jpg';
import viewOurLookbook from '../../public/landing/05-view-our-lookbook.jpg';

export default function Index() {
  const { t } = useTranslation('home');
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
            productPageLink="/viola-dress"
            productImageLink={firstImage.src}
            productName="VIOLA Dress"
            price="€180"
            width={firstImage.width}
            height={firstImage.height}
          />
          <SingleProductCard
            className="col-md-6"
            productPageLink="/susan-dress"
            productImageLink={secondImage.src}
            productName="SUSAN Dress"
            price="€250"
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
