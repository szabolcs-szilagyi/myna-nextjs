import Container from 'react-bootstrap/Container';
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';

import Slider from '../components/Slider';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import SingleProductCard from '../components/SingleProductCard';
import usePing from '../lib/use-ping';

import consciouslyBeautiful from '../../public/landing/consciously_beautiful.jpg';
import loveAndLight from '../../public/landing/love_and_light.jpg';
import helenBlazer from '../../public/landing/helen-blazer.jpg';
import marigoldTrenchCoat from '../../public/landing/marigold-trench-coat.jpg';
import floraWrapDress from '../../public/landing/flora-wrap-dress.jpg';
import lolaOversizedShirt from '../../public/landing/lola-oversized-shirt.jpg'
import noliaDress from '../../public/landing/nolia-dress.jpg';
import sennaSkirt from '../../public/landing/senna-skirt.jpg';
import viewOurLookbook from '../../public/landing/view-our-lookbook.jpg';

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
              productImageLink={consciouslyBeautiful.src}
              productName="MARIGOLD Trench Coat"
            >
              <p className="text-center">Consciously Beautiful<br />{t('Collection')}</p>
            </SingleProductCard>
            <SingleProductCard
              className="col-md-4"
              productPageLink="/shop-collections#love-and-light"
              productImageLink={loveAndLight.src}
              productName="LOLA Shirt"
            >
              <p className="text-center">Love & Light<br />{t('Collection')}</p>
            </SingleProductCard>
          </div>
        </div>
      </div>

      <div className="col-md-6 mx-auto">
        <h1 className="text-center mt-5 mb-3">{t('magic-text-shop-the-looks')}</h1>
      </div>
      <div className="row col-md-8 mx-auto px-0">
        <SingleProductCard
          className="col-md-3"
          productPageLink="/marigold-trench-coat"
          productImageLink={marigoldTrenchCoat.src}
          productName="MARIGOLD Trench Coat"
          price="€215"
          width={853}
          height={1280}
        />
        <SingleProductCard
          className="col-md-3"
          productPageLink="/lola-oversized-shirt"
          productImageLink={lolaOversizedShirt.src}
          productName="LOLA Oversized Shirt"
          price="€149"
          width={853}
          height={1280}
        />
        <SingleProductCard
          className="col-md-3"
          productPageLink="/helen-blazer"
          productImageLink={helenBlazer.src}
          productName="HELEN Blazer"
          price="€225"
          width={853}
          height={1280}
        />
        <SingleProductCard
          className="col-md-3"
          productPageLink="/flora-wrap-dress"
          productImageLink={floraWrapDress.src}
          productName="FLORA Wrap Dress"
          price="€229"
          width={853}
          height={1280}
        />
      </div>

      <div className="col-md-8 mx-auto">
        <h1 className="text-center mt-5 mb-3">{t('lotus-title')}</h1>
        <div className="row">
          <div className="col-12 col-xl-6 my-auto order-last">
            <Trans
              i18nKey="home:lotus-text"
              components={[<p />]}
            />
          </div>
          <SingleProductCard
            className="col-md-3"
            productPageLink="/senna-skirt"
            productImageLink={sennaSkirt.src}
            productName="SENNA Skirt"
            price="€115"
            width={853}
            height={1280}
          />
          <SingleProductCard
            className="col-md-3"
            productPageLink="/nolia-dustpink"
            productImageLink={noliaDress.src}
            productName="NOLIA Dress"
            price="€215"
            width={853}
            height={1280}
          />
        </div>
      </div>

      <div className="col-md-8 mx-auto">
        <h1 className="text-center mt-5 mb-3">{t('STAY INSPIRED WITH MYNA – VIEW OUR LOOKBOOK')}</h1>
        <SingleProductCard
          className="col-md-8 mx-auto"
          productPageLink="/lookbook"
          productImageLink={viewOurLookbook.src}
          productName="LOOKBOOK"
          width={1280}
          height={640}
        />
      </div>

      <Footer />
    </Container>
  );
}
