import Container from 'react-bootstrap/Container';
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';

import Slider from '../components/Slider';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import SingleProductCard from '../components/SingleProductCard';
import usePing from '../lib/use-ping';

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
              productImageLink="/landing/consciously_beautiful.jpg"
              productName="MARIGOLD Trench Coat"
            >
              <p className="text-center">Consciously Beautiful<br />{t('Collection')}</p>
            </SingleProductCard>
            <SingleProductCard
              className="col-md-4"
              productPageLink="/shop-collections#love-and-light"
              productImageLink="/landing/love_and_light.jpg"
              productName="LOLA Shirt"
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
          productPageLink="/helen-blazer"
          productImageLink="/landing/helen-blazer.jpg"
          productName="HELEN Blazer"
          price="€225"
          width={853}
          height={1280}
        />
        <SingleProductCard
          className="col-md-3"
          productPageLink="/marigold-trench-coat"
          productImageLink="/landing/marigold-trench-coat.jpg"
          productName="MARIGOLD Trench Coat"
          price="€215"
          width={853}
          height={1280}
        />
        <SingleProductCard
          className="col-md-3"
          productPageLink="/flora-wrap-dress"
          productImageLink="/landing/flora-wrap-dress.jpg"
          productName="FLORA Wrap Dress"
          price="€229"
          width={853}
          height={1280}
        />
        <SingleProductCard
          className="col-md-3"
          productPageLink="/peri-blouse"
          productImageLink="/landing/peri-blouse.jpg"
          productName="PERI Blouse"
          price="€155"
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
            productPageLink="/peri-blouse"
            productImageLink="/landing/peri-top.jpg"
            productName="PERI Blouse"
            price="€155"
            width={853}
            height={1280}
          />
          <SingleProductCard
            className="col-md-3"
            productPageLink="/peri-sis-handkerchief"
            productImageLink="/landing/embroidery.jpg"
            productName="PERI SIS Handkerchief"
            price="€27"
            width={853}
            height={1280}
          />
        </div>
      </div>

      <div className="col-md-8 mx-auto">
          <h1 className="text-center mt-5 mb-3">{t('Conscious Woman')}</h1>
          <div className="row">
            <SingleProductCard
              className="col-md-4 mx-auto"
              productPageLink="/delphi-culottes"
              productImageLink="/landing/conscious-woman-01.jpg"
              productName="DELPHI Culottes"
              price="€89"
              width={853}
              height={1280}
            />
            <SingleProductCard
              className="col-md-4 mx-auto"
              productPageLink="/delphi-culottes"
              productImageLink="/landing/conscious-woman-02.jpg"
              productName=""
              width={853}
              height={1280}
            />
          </div>
          <div className="col-12">
            <Trans
              i18nKey="home:conscious-woman-long"
              components={[<br />]}
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
