import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Container from 'react-bootstrap/Container';
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';
import usePing from '../lib/use-ping';

export default function PrivacyContact() {
  const { t } = useTranslation('privacy-contact');
  usePing();

  return (
    <Container fluid>
      <Header />
      <Nav />
      <div className="spacer50px" />
      <div className="row">
        <div className="col-md-12 ce capitalLetters">
          <h1><strong>{t('Privacy')}</strong></h1>
        </div>
      </div>
      <div className="spacer50px" />
      <div className="row">
        <div className="col-md-2" />
        <div className="col-md-8">
          <p>{t('we-respect-your-privacy')}</p>
          <p>{t('the-information')}</p>
          <p>
            <Trans
              i18nKey="privacy-contact:when-you-subscribe"
              components={[
                <a href="mailto:connect@mynalabel.com" className="blackFont" />,
              ]}
            />
          </p>
          <div className="spacer50px" />
          <h1 className="capitalLetters ce"><strong>Contact</strong></h1>
          <div className="spacer50px" />
          <p>
            <strong>{t('if-you-need-to-speak')}:</strong> <br /><a href="mailto:connect@mynalabel.com" className="blackFont">connect@mynalabel.com</a>
          </p>
          <p>
            <strong>{t('Social media')}:</strong> <br /><a href="https://instagram.com/mynalabel" target="_blank" className="blackFont" rel="noreferrer">instagram.com/mynalabel</a>
          </p>
        </div>
        <div className="col-md-2" />
      </div>
      <div className="spacer50px" />
      <Footer />
    </Container>
  );
}
