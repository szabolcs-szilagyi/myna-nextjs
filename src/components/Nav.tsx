import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as reactBootstrap from "react-bootstrap";
import Cookies from "universal-cookie";
const cookies = new Cookies();
import style from "./Nav.module.scss";
import getConfig from "next/config";
import { getInCart } from "../services/nestjs-server";
import Image from 'next/image';
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

  useEffect(() => {
    getInCart().then(numberOfProducts => setInCart(numberOfProducts || 0));
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
    <Navbar
      className={`${style.menuFontSetting} row justify-content-center no-gutters pl-0 pr-0 text-center blackFont capitalLetters`}
      bg="white"
      expand="md"
    >
      <BSNav className="col-12 col-sm-12 col-md-4 col-xl-2">
        <Navbar.Brand href="/">
          <Image
            src="/logo.png"
            width="240"
            height="107"
            alt="MYNA Logo"
            loading="lazy"
          />
        </Navbar.Brand>
      </BSNav>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse
        id="basic-navbar-nav"
        className="row no-gutters col-12 col-sm-12 col-md-8 col-xl-10 justify-content-center justify-content-xl-between"
      >
        <BSNav className="order-2 order-sm-3 order-xl-1 col-xl-2 col-sm-4 pt-sm-5 pt-xl-0">
          <BSNav.Link className="w-100" href="/lookbook" data-cy="lookbook-link">{t("Lookbook")}</BSNav.Link>
        </BSNav>
        <BSNav className="order-3 order-sm-4 order-xl-2 col-xl-2 col-sm-4 pt-sm-5 pt-xl-0">
          <BSNav.Link className="w-100" href="https://blog.mynalabel.com">{t("Blog")}</BSNav.Link>
        </BSNav>
        <BSNav className="order-4 order-sm-5 order-xl-3 col-xl-1 col-sm-4 pt-sm-5 pt-xl-0">
          <BSNav.Link className="w-100" href="/shop-collections" data-cy="shop-collections-link">
            {t("Shop Collections")}
          </BSNav.Link>
        </BSNav>
        <BSNav className="order-5 order-sm-6 order-xl-4 col-xl-2 col-sm-4 pt-sm-5 pt-xl-0">
          <BSNav.Link className="w-100" href="/sustainability">{t("Sustainability")}</BSNav.Link>
        </BSNav>
        <BSNav className="order-6 order-sm-7 order-xl-5 col-xl-2 col-sm-4 pt-sm-5 pt-xl-0">
          <BSNav.Link className="w-100" href="/our-story">{t("Our Story")}</BSNav.Link>
        </BSNav>
        <Cart
          containerClass="order-1 order-sm-1 order-xl-6 col-xl-1 col-sm-4 pt-sm-5 pt-xl-0"
          lastItemsDate={lastItemsDate}
        />
        <BSNav className="order-7 order-sm-2 order-xl-7 col-xl-1 col-sm-4 pt-sm-5 pt-xl-0">
          <button
            className={i18nEnabled ? style.i18nButton : "d-none"}
            data-cy="language-switcher"
            onClick={changeLang}
          >
            {nextLang}
          </button>
        </BSNav>
      </Navbar.Collapse>
    </Navbar>
  );
}
