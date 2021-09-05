import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import * as reactBootstrap from 'react-bootstrap';
import Cookies from 'universal-cookie';
import {
  API_PATH,
  API_SERVER,
} from '../constants';
import style from './Nav.module.css';
import getConfig from 'next/config';
const { publicRuntimeConfig: { i18nEnabled } } = getConfig();

const {
  Navbar,
  Nav: BSNav
} = reactBootstrap;

const cookies = new Cookies();
const session = cookies.get('session');


function getInCart() {
  return fetch(API_SERVER + API_PATH + '?part=getproductsnumberincart&sessiontoken=' + session)
    .then(response => response.json())
		.then(output => output.nr)
    .catch(error => console.log(error.message));
}

function Cart({ containerClass, lastItemsDate }) {
  const [inCart, setInCart] = useState(0);
  const [cartIcon, setCartIcon] = useState('/cart.png');

  useEffect(() => {
    getInCart()
      .then(numberOfProducts => setInCart(numberOfProducts));
  }, [inCart, lastItemsDate]);

  return (
    <div className={containerClass}>
      <Link href="/checkout"><a
        className="menu"
        onMouseEnter={() => setCartIcon('/cart-b.png')}
        onMouseLeave={() => setCartIcon('/cart.png')}
      ><img
         src={cartIcon}
         width="35"
         height="35"
       />({inCart})</a></Link>
    </div>
  );
}

type NavPropsType = {
  lastItemsDate?: string,
};

export default function Nav({ lastItemsDate }: NavPropsType) {
  const router = useRouter();
  const { t, lang } = useTranslation('common');

  const [nextLang, setNextLang] = useState(lang === 'en' ? 'pl' : 'en');

  function changeLang() {
    setNextLang(nextLang === 'en' ? 'pl' : 'en');
    cookies.set('NEXT_LOCALE', nextLang);
    router.replace(router.asPath, undefined, { locale: nextLang })
  }

  return (
    <div>
      <div className="desktopNav">
        <div className="row">
          <div className="col-md-2">
            <Link href="/">
              <a><img className="logoMain" src="/logo.png" alt="MYNA Logo" /></a>
            </Link>
          </div>
          <div className="col-md-7 capitalLetters">
            <ul className="navMenu">
              <li><Link href="/lookbook"><a>{t('Lookbook')}</a></Link></li>
              <li><Link href="/shop-collections"><a>{t('Shop Collections')}</a></Link></li>
              <li><Link href="/sustainability"><a>{t('Sustainability')}</a></Link></li>
              <li><Link href="/our-story"><a>{t('Our Story')}</a></Link></li>
            </ul>
          </div>
          <div className="col-md-3">
            <div className="row capitalLetters">
              <div className="col-md-6 ce padtop50px">
                <Link href="/my-account"><a className="menu">{t('My Account')}</a></Link>
              </div>
              <Cart
                containerClass="col-md-4 ce padtop43px navCart"
                lastItemsDate={lastItemsDate}
              />
              <div className="col-md-2 ce padtop43px">
                <button className={i18nEnabled ? style.i18nButton : 'd-none'} onClick={changeLang}>{nextLang}</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="tabNav">
        <div className="row">
          <div className="col-md-1" />
          <div className="col-md-2">
            <Link href="/"><a><img src="/logo.png" alt="MYNA Logo" /></a></Link>
          </div>
          <div className="col-md-1" />
          <div className="col-md-4 ce menu">
            <div className="padtop50px blackFont">
              <Link href="/my-account"><a>{t('My Account')}</a></Link>
            </div>
          </div>
          <div className="col-md-2 ce">
            <Cart
              containerClass="padtop43px blackFont"
              lastItemsDate={lastItemsDate}
            />
          </div>
          <div className="col-md-2 ce padtop43px">
            <button className={i18nEnabled ? style.i18nButton : 'd-none'} onClick={changeLang}>{nextLang}</button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 ce menu">
            <div className="padtop43px blackFont">
              <Link href="/lookbook"><a>{t('Lookbook')}</a></Link>
            </div>
          </div>
          <div className="col-md-3 ce menu">
            <div className="padtop43px blackFont">
              <Link href="/shop-collections"><a>{t('Shop Collections')}</a></Link>
            </div>
          </div>
          <div className="col-md-3 ce menu">
            <div className="padtop43px blackFont">
              <Link href="/sustainability"><a>{t('Sustainability')}</a></Link>
            </div>
          </div>
          <div className="col-md-3 ce menu">
            <div className="padtop43px blackFont">
              <Link href="/our-story"><a>{t('Our Story')}</a></Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mobileNav">
        <Navbar bg="white" expand="lg">
          <Navbar.Brand href="/">
            <img
              src="/logo.png"
              width="240"
              height="107"
              alt="MYNA Logo"
              loading="lazy"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="text-center">
            <BSNav>
              <BSNav.Link className="blackFont" href="/my-account">{t('My Account')}</BSNav.Link>
              <Cart
                containerClass="blackFont padtop10px"
                lastItemsDate={lastItemsDate}
              />
              <BSNav.Link className="blackFont" href="/lookbook">{t('Lookbook')}</BSNav.Link>
              <BSNav.Link className="blackFont" href="/shop-collections">{t('Shop Collections')}</BSNav.Link>
              <BSNav.Link className="blackFont" href="/sustainability">{t('Sustainability')}</BSNav.Link>
              <BSNav.Link className="blackFont" href="/our-story">{t('Our Story')}</BSNav.Link>
              <button className={i18nEnabled ? style.i18nButton : 'd-none'} onClick={changeLang}>{nextLang}</button>
            </BSNav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </div>
  );
}
