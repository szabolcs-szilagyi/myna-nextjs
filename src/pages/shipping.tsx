import React from 'react';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Ping from '../components/Ping';
import Container from 'react-bootstrap/Container';
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';

export default function Shipping() {
  const { t } = useTranslation('shipping');

  return (
    <Container fluid>
      <Header />
      <Nav />
      <Ping />
      <div className="spacer50px" />
      <div className="row">
        <div className="col-md-12 ce capitalLetters">
          <h1><strong>{t('Shipping')}</strong></h1>
        </div>
      </div>
      <div className="spacer50px" />
      <div className="row">
        <div className="col-md-2" />
        <div className="col-md-8">
          <p>{t('your-pieces')}</p>
          <p><Trans
               i18nKey="shipping:estimated-shipping"
               components={[
                 <br />,
                 <a href="mailto:connect@mynalabel.com" className="blackFont" />,
               ]}
            /></p>
          <p>{t('Customs and import taxes')}: <br />
            {t('customers-are-responsible')}
          </p>
          <div className="spacer50px" />
          <h1 className="capitalLetters ce"><strong>{t('Returns and Exchanges')}</strong></h1>
          <div className="spacer50px" />
          <p><Trans
               i18nKey="shipping:if-you-are-unhappy"
               components={[
                 <a href="mailto:connect@mynalabel.com" className="blackFont" />
               ]}
            /></p>
          <p>
            {t('Returns and exchanges')}: <br />
            <Trans
              i18nKey="shipping:if-you-are-otherwise"
              components={[<br />]}
            />
          </p>
          <p>
            {t('Conditions of return')}: <br />
            {t('customers-responsible-return')}
          </p>
          <p>{t('returned-from-outside-eu')}</p>
          <p>{t('incase-returned-not-arrived')}</p>
        </div>
        <div className="col-md-2" />
      </div>
      <div className="spacer50px" />
      <Footer />
    </Container>
  );
}
