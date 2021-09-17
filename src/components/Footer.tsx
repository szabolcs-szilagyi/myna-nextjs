import React, { useState } from 'react';
import Link from 'next/link';
import {
  API_SERVER,
  API_PATH,
  EMAIL_PATH,
} from '../constants';
import fetch from 'isomorphic-unfetch';
import useTranslation from 'next-translate/useTranslation';

export default function Footer(props: any) {
  const { t } = useTranslation('common');
  const [state, setState] = useState({
    active: '',
    value: '',
    token: '',
    placeHolder: 'EMAIL HERE',
  })

  function handleChange (event) {
    setState({
      ...state,
      value: event.target.value,
    });
  }

  function subscribePressed () {
    setTimeout(getToken, 100);
    setTimeout(sendMail, 500);
  }

  function getToken () {
    fetch(API_SERVER + API_PATH + '?part=setnewslettersubscription&email=' + state.value)
      .then(response => response.json())
      .then(({ token }) => {
        setState({
          ...state,
          token,
        });
      })
      .catch(error => console.log(error.message));
  }

  function sendMail () {
    fetch(API_SERVER + EMAIL_PATH + '?part=subscribenewsletter&email=' + state.value + '&token=' + state.token);
    setState({
      ...state,
      placeHolder: 'check your mailbox',
      value: '',
    });
  }

  return (
    <div>
      <div className="spacer50px"></div>
      <hr />
      <div className="spacer25px"></div>
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <div className="row">
            <div className="col-md-6">
              <div className="email_newsletter">
                <div className="row">
                  <div className="col-md-8">
                    <input
                      type="email"
                      name="emailNewsletter"
                      value={state.value}
                      placeholder={t(state.placeHolder)}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-4 ce">
                    <button
                      className="nlsb"
                      onClick={subscribePressed}
                    >{t('SUBSCRIBE')}</button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 ce">
                    <div className="spacer25px" />{t('we-respect-your-privacy')}</div>
                </div>
                <div className="row">
                  <div className="col-md-12 ce">
                    <img className="logo" src="/logo.png" alt="MYNA logo" />
                  </div>
                  <div className="col-6 text-right">
                    <a
                      href="https://www.facebook.com/mynalabel"
                      target="fb-mynalabel"
                    ><img
                       src="/facebook.svg"
                       alt="facebook"
                       width="30"
                       height="30"
                      /></a>
                  </div>
                  <div className="col-6">
                    <a
                      href="https://www.instagram.com/mynalabel/"
                      target="insta-mynalabel"
                    ><img
                       src="/instagram.svg"
                       alt="instagram"
                       width="30"
                       height="30"
                      /></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-8">
                  <p><Link href="/our-story"><a className="blackFont">{t('Our Story')}</a></Link></p>
                  <p><Link href="/sustainability"><a className="blackFont">{t('Sustainability')}</a></Link></p>
                  <p><Link href="/shipping"><a className="blackFont">{t('shipping-n-returns')}</a></Link></p>
                  <p><Link href="/size-measurement"><a className="blackFont">{t('size-n-measurement')}</a></Link></p>
                  <p><Link href="/privacy-contact"><a className="blackFont">{t('privacy-n-contact')}</a></Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-2"></div>
        <div className="spacer50px"></div>
      </div>
    </div>
  );
}
