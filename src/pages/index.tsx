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

import firstImage from '../../public/landing/01.jpg';
import secondImage from '../../public/landing/02.jpg';
import thirdImage from '../../public/landing/03.jpg';
import fourthImage from '../../public/landing/04.jpg';
import fifthImage from '../../public/landing/05.jpg';

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
            i18nKey="home:laning-inspiration-two"
            components={[]}
          />
        </h1>
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
            className="col-md-4"
            productPageLink="/daphne-cardigan"
            productImageLink={firstImage.src}
            productName="DAPHNE Cardigan"
            price="€290"
            width={firstImage.width}
            height={firstImage.height}
          />
          <SingleProductCard
            className="col-md-4"
            productPageLink="/zephyra-vest"
            productImageLink={secondImage.src}
            productName="ZEPHYRA Vest"
            price="€210"
            width={secondImage.width}
            height={secondImage.height}
          />
          <SingleProductCard
            className="col-md-4"
            productPageLink="/zephyra-vest"
            productImageLink={thirdImage.src}
            productName="ZEPHYRA Vest"
            price="€210"
            width={thirdImage.width}
            height={thirdImage.height}
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
            productImageLink={fourthImage.src}
            productName="SHOP COLLECTION"
            width={fourthImage.width}
            height={fourthImage.height}
          />
        </div>
      </div>

     <div className="col-md-6 mx-auto">
       <h1 className="text-center mt-5 mb-3">
         <Trans
           i18nKey="home:believe-text-two"
           components={[<p />]}
         />
       </h1>
     </div>

      <div className="col-md-8 mx-auto">
        <h1 className="text-center mt-5 mb-3">{t('lookbook-title-caption')}</h1>

        <SingleProductCard
          className="col-md-12 mx-auto"
          productPageLink="/lookbook"
          productImageLink={fifthImage.src}
          productName="LOOKBOOK"
          width={fifthImage.width}
          height={fifthImage.height}
        />
      </div>

      <Footer />
    </Container>
  );
}
