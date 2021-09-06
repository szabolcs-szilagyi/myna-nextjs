import React from 'react';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation'

import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Ping from '../components/Ping';
import Container from 'react-bootstrap/Container';

export default function OurStory() {
  const { t } = useTranslation('our-story');

  return (
    <Container fluid>
      <Header />
      <Nav />
      <Ping />
      <div className="spacer50px" />
      <div className="row">
        <div className="col-md-2" />
        <div className="col-md-8">
          <div className="col-md-12 ce capitalLetters">
            <h1><strong>{t('Our Mission')}</strong></h1>
          </div>
          <div className="spacer50px"></div>
          <p>{t('We are more than just ethical and sustainable brand')}</p>
          <p>{t('We create feminine and effortless design')}</p>
          <p>{t('We design pieces to love forever, create and promote timeless fashion')}</p>
          <p>{t('We are conscious label')}</p>
          <p>{t('We promote authentic connection')}</p>
          <p>{t('we-design-pieces-that-are-beautiful')}</p>
          <p>{t('We design long lasting and quality designs and products')}</p>
          <p>{t('We are not setting new, but long lasting trends')}</p>
          <p>{t('We create so you can feel amazing, beautiful and have free conscious')}</p>
          <p>{t('We give you attention to details and personal attention')}</p>
          <p>{t('We aim to inspire your life!')}</p>
          <p>{t('we-use-eco-friendly-fabrics')}</p>

          <div className="col-md-12 mt-5 ce capitalLetters">
            <h1><strong>{t('Our Values')}</strong></h1>
          </div>
          <div className="spacer50px"></div>
          <p><i>{t('Body Positivity')}</i>{' '}| {t('we-bring-a-trusted-and-beautiful')}</p>
          <p><i>{t('Positive Impact')}</i>{' '}| {t('we-are-dreamers-and-believers')}</p>
          <p><i>{t('Humanity')}</i>{' '}| {t('we-are-not-willing-to-compromise')}</p>
          <p><i>{t('Environment')}</i>{' '}| {t('we-promote-slow-fashion-movement')}</p>

          <div className="col-md-12 mt-5 ce capitalLetters">
            <h1><strong>{t('Our Vision')}</strong></h1>
          </div>
          <div className="spacer50px"></div>
          <p>{t('our-vision-is-a-world-dedicated')}</p>
          <p>{t('we-would-like-our-brand-to-be-classic')}</p>

          <div className="col-md-12 mt-5 ce capitalLetters">
            <h1><strong>{t('Our Story')}</strong></h1>
          </div>
          <div className="spacer50px"></div>
          <p>{t('fashion-was-always-deep')}</p>
          <p>{t('thats-how-myna-came-about')}</p>
          <p>{t('thanks-to-myna')}</p>
          <p>{t('we-love-timeless-fashion')}</p>

          <div className="spacer25px" />

          <div className="row">
            <div className="col-md-4">
              <Image
                src="/our-story-01.jpg"
                layout="responsive"
                width={200}
                height={200}
                alt={t('Designer')}
              />
            </div>
            <div className="col-md-4">
              <Image
                src="/our-story-02.jpg"
                layout="responsive"
                width={200}
                height={200}
                alt={t('Inspiration')}
              />
            </div>
            <div className="col-md-4">
              <Image
                src="/our-story-03.jpg"
                layout="responsive"
                width={200}
                height={200}
                alt={t('nature-as-muse')}
              />
            </div>
          </div>
        </div>
        <div className="col-md-2" />
      </div>
      <div className="spacer50px" />
      <Footer />
    </Container>
  );
}
