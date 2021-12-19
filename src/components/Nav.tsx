import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import * as reactBootstrap from "react-bootstrap";
import Cookies from "universal-cookie";
const cookies = new Cookies();
import style from "./Nav.module.css";
import getConfig from "next/config";
import { getInCart } from "../services/nestjs-server";
const {
  publicRuntimeConfig: { i18nEnabled }
} = getConfig();

const { Navbar, Nav: BSNav } = reactBootstrap;

type TCartProps = {
  containerClass?: string;
  lastItemsDate?: string;
};

function Cart({ containerClass, lastItemsDate }: TCartProps) {
  const [inCart, setInCart] = useState(0);
  const [cartIcon, setCartIcon] = useState("/cart.png");

  console.log("render");
  useEffect(() => {
    console.log(inCart, lastItemsDate);
    getInCart().then(numberOfProducts => setInCart(numberOfProducts));
  }, [inCart, lastItemsDate]);

  return (
    <div className={containerClass}>
      <Link href="/checkout">
        <a
          className="menu"
          onMouseEnter={() => setCartIcon("/cart-b.png")}
          onMouseLeave={() => setCartIcon("/cart.png")}
        >
          <img src={cartIcon} width="35" height="35" />
          <span data-cy="cartCounter">({inCart})</span>
        </a>
      </Link>
    </div>
  );
}

type NavPropsType = {
  lastItemsDate?: string;
};

export default function Nav({ lastItemsDate }: NavPropsType) {
  const router = useRouter();
  const { t, lang } = useTranslation("common");

  const [nextLang, setNextLang] = useState(lang === "en" ? "pl" : "en");

  function changeLang() {
    setNextLang(nextLang === "en" ? "pl" : "en");
    cookies.set("NEXT_LOCALE", nextLang);
    router.replace(router.asPath, undefined, { locale: nextLang });
  }

  return (
    <div>
      <div className="desktopNav">
        <div className="row">
          <div className="col-sm-2 offset-sm-1 offset-xl-0 order-1">
            <Link href="/">
              <a>
                <img className="logoMain" src="/logo.png" alt="MYNA Logo" />
              </a>
            </Link>
          </div>
          <div className="row col-xl-7 order-xl-2 justify-content-sm-center justify-content-xl-between pr-sm-0 capitalLetters order-3">
            <div className="col-xl-2 col-sm-4 pt-sm-5 text-center blackFont">
              <Link href="/lookbook">
                <a data-cy="lookbook-link">{t("Lookbook")}</a>
              </Link>
            </div>
            <div className="col-xl-2 col-sm-4 pt-sm-5 text-center blackFont">
              <Link href="/gallery">
                <a data-cy="gallery-link">{t("Gallery")}</a>
              </Link>
            </div>
            <div className="col-xl-2 col-sm-4 pt-sm-5 text-center blackFont">
              <Link href="/shop-collections">
                <a data-cy="shop-collections-link">{t("Shop Collections")}</a>
              </Link>
            </div>
            <div className="col-xl-2 col-sm-4 pt-sm-5 text-center blackFont">
              <Link href="/sustainability">
                <a>{t("Sustainability")}</a>
              </Link>
            </div>
            <div className="col-xl-2 col-sm-4 pt-sm-5 text-center blackFont">
              <Link href="/our-story">
                <a>{t("Our Story")}</a>
              </Link>
            </div>
          </div>
          <div className="col-sm-8 offset-sm-1 col-xl-3 offset-xl-0 order-2 order-xl-3">
            <div className="row capitalLetters">
              <div className="col-md-6 ce padtop50px">
                <Link href="/my-account">
                  <a className="menu">{t("My Account")}</a>
                </Link>
              </div>
              <Cart
                containerClass="col-md-4 ce padtop43px navCart"
                lastItemsDate={lastItemsDate}
              />
              <div className="col-md-2 ce padtop43px">
                <button
                  className={i18nEnabled ? style.i18nButton : "d-none"}
                  onClick={changeLang}
                  data-cy="language-switcher"
                >
                  {nextLang}
                </button>
              </div>
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
              <BSNav.Link className="blackFont" href="/my-account">
                {t("My Account")}
              </BSNav.Link>
              <Cart
                containerClass="blackFont padtop10px"
                lastItemsDate={lastItemsDate}
              />
              <BSNav.Link className="blackFont" href="/lookbook">
                {t("Lookbook")}
              </BSNav.Link>
              <BSNav.Link className="blackFont" href="/gallery">
                {t("Gallery")}
              </BSNav.Link>
              <BSNav.Link className="blackFont" href="/shop-collections">
                {t("Shop Collections")}
              </BSNav.Link>
              <BSNav.Link className="blackFont" href="/sustainability">
                {t("Sustainability")}
              </BSNav.Link>
              <BSNav.Link className="blackFont" href="/our-story">
                {t("Our Story")}
              </BSNav.Link>
              <button
                className={i18nEnabled ? style.i18nButton : "d-none"}
                onClick={changeLang}
              >
                {nextLang}
              </button>
            </BSNav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </div>
  );
}
