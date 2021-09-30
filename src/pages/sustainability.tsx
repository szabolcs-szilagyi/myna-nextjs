import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation'

import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Container from 'react-bootstrap/Container';
import usePing from '../lib/use-ping';

export default function Sustainability() {
  const { t } = useTranslation('sustainability');
  usePing();

  return (
    <Container fluid>
      <Header description="sustainability" />
      <Nav />
      <div className="spacer50px"></div>
      <div className="row">
        <div className="col-md-12 ce capitalLetters">
          <h1><strong>{t('Sustainability')}</strong></h1>
        </div>
      </div>
      <div className="spacer50px"></div>
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <div className="spacer25px"></div>
          <div className="row">
            <div className="col-md-4">
              <Image
                src="/sustainability/who-made-your-clouths-01.jpg"
                width={300}
                height={400}
                alt={t('The creation')}
              />
            </div>
            <div className="col-md-8">
              <p className="capitalLetters"><strong>{t('Who made your clothes')}</strong></p>
              <p className="ju">{t('all-our-pieces-are-hand-crafted')}</p>
            </div>
          </div>
          <div className="spacer50px"></div>
          <div className="row">
            <div className="col-md-8">
              <p className="capitalLetters"><strong>{t('Timeless pieces')}</strong></p>
              <p className="ju">{t('we-give-you-small-capsule-collections')}</p>
              <p className="ju">{t('our-pieces-are-destined-to-complement')}</p>
            </div>
            <div className="col-md-4">
              <Image
                src="/sustainability/timeless-pieces.jpg"
                width={1066}
                height={1025}
                alt={t('The Design Process')}
              />
            </div>
          </div>
          <div className="spacer50px"></div>
          <div className="row">
            <div className="col-md-4">
              <Image
                src="/sustainability/who-made-your-clouths-02.jpg"
                width={300}
                height={400}
                alt={t('Nature Friendly Packaging')}
              />
            </div>
            <div className="col-md-8">
              <p className="capitalLetters"><strong>{t('Ethically sourced')}</strong></p>
              <p className="ju">{t('we-believe-in-transparency')}</p>
            </div>
          </div>
          <div className="spacer50px"></div>
          <div className="row">
            <div className="col-md-8">
              <p className="capitalLetters"><strong>{t('Our suppliers')}</strong></p>
              <p className="ju">
                <strong>{t('Samatoa')}</strong> - {t('cambodian-based-social-textile')} <br />
                <strong>{t('Siebenblau')}</strong> - {t('germany-based-natural-organic')} <br />
                <strong>{t('Fabric House SRL')}</strong> - {t('italy-based-distributor')}
              </p>
            </div>
            <div className="col-md-4">
              <Image
                src="/sustainability/packaging-and-shipping-01.jpg"
                width={3984}
                height={2656}
                alt={t('Nature Friendly Packaging')}
              />
            </div>
          </div>
          <div className="spacer50px"></div>
          <div className="row">
            <div className="col-md-4">
              <Image
                src="/sustainability/packaging-and-shipping-02.jpg"
                width={3984}
                height={2656}
                alt={t('Multi Purpose Packaging')}
              />
            </div>
            <div className="col-md-8">
              <p className="capitalLetters"><strong>{t('Packaging and shipping')}</strong></p>
              <p className="ju">{t('we-exclusively-use-recyclable')}</p>
            </div>
          </div>

        </div>
        <div className="col-md-2"></div>
      </div>
      <div className="spacer50px"></div>
      <Footer />
    </Container>
  );
}
