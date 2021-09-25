import Trans from 'next-translate/Trans';
import useTranslation from 'next-translate/useTranslation';
import Container from 'react-bootstrap/Container';

import Footer from '../components/Footer';
import Header from '../components/Header';
import Nav from '../components/Nav';
import SizeInfo from '../components/SizeInfo';
import usePing from '../lib/use-ping';

export default function SizeMeasurement() {
  const { t } = useTranslation('size-measurement');
  usePing();

  return (
    <Container fluid>
      <Header />
      <Nav />
      <div className="spacer50px" />
      <div className="row">
        <div className="col-md-12 ce capitalLetters">
          <h1><strong>{t('Size and Measurements')}</strong></h1>
        </div>
      </div>
      <div className="spacer50px" />
      <div className="row">
        <div className="col-md-2" />
        <div className="col-md-8 ce">
          <div>
            <SizeInfo tableClass="mainMeas"/>
          </div>
          <div className="spacer50px" />
          <div className="spacer25px" />
          <p>
            <Trans
              i18nKey="size-measurement:size-outside-offer"
              components={[
                <br />,
                <a href="mailto:connect@mynalabel.com" className="blackFont" />,
              ]}
            />
          </p>
          <div className="spacer25px" />
          <p>
            <Trans
              i18nKey="size-measurement:take-measurement"
              components={[
                <br />,
              ]}
            />
          </p>
        </div>
        <div className="col-md-2" />
      </div>
      <div className="spacer50px" />
      <Footer />
    </Container>
  );
}
