import React, { useState, useEffect } from 'react';
import * as reactBootstrap from 'react-bootstrap';

const { Navbar, Nav: BSNav, NavDropdown } = reactBootstrap;

import Cookies from 'universal-cookie';
const cookies = new Cookies();
const session = cookies.get('session');

import {
  API_SERVER,
  API_PATH,
} from '../constants';


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
      <a
        className="menu"
        href="/checkout"
        onMouseEnter={() => setCartIcon('/cart-b.png')}
        onMouseLeave={() => setCartIcon('/cart.png')}
      ><img
         src={cartIcon}
         width="35"
         height="35"
       />({inCart})</a>
    </div>
  );
}

type NavPropsType = {
  lastItemsDate?: string,
};

export default function Nav(props: NavPropsType);
export default function Nav({ lastItemsDate }) {
  return (
    <div>
      <div className="desktopNav">
        <div className="row">
          <div className="col-md-2">
            <a href="/"><img className="logoMain" src="/logo.png" alt="MYNA Logo" /></a>
          </div>
          <div className="col-md-7 capitalLetters">
            <ul className="navMenu">
              <li><a href="/lookbook">Lookbook</a></li>
              <li><a href="/shop-collections">Shop Collections</a></li>
              <li><a href="/sustainability">Sustainability</a></li>
              <li><a href="/our-story">Our Story</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <div className="row capitalLetters">
              <div className="col-md-7 ce padtop50px">
                <a className="menu" href="/my-account">My Account</a>
              </div>
              <Cart
                containerClass="col-md-5 ce padtop43px navCart"
                lastItemsDate={lastItemsDate}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="tabNav">
        <div className="row">
          <div className="col-md-1" />
          <div className="col-md-2">
            <a href="/"><img src="/logo.png" alt="MYNA Logo" /></a>
          </div>
          <div className="col-md-1" />
          <div className="col-md-4 ce menu">
            <div className="padtop50px blackFont"><a href="/my-account">My Account</a></div>
          </div>
          <div className="col-md-4 ce">
            <Cart
              containerClass="padtop43px blackFont"
              lastItemsDate={lastItemsDate}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 ce menu">
            <div className="padtop43px blackFont"><a href="/lookbook">Lookbook</a></div>
          </div>
          <div className="col-md-3 ce menu">
            <div className="padtop43px blackFont"><a href="/shop-collections">Shop Collections</a></div>
          </div>
          <div className="col-md-3 ce menu">
            <div className="padtop43px blackFont"><a href="/sustainability">Sustainability</a></div>
          </div>
          <div className="col-md-3 ce menu">
            <div className="padtop43px blackFont"><a href="/our-story">Our Story</a></div>
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
              <BSNav.Link className="blackFont" href="/my-account">My Account</BSNav.Link>
              <Cart
                containerClass="blackFont padtop10px"
                lastItemsDate={lastItemsDate}
              />
              <BSNav.Link className="blackFont" href="/lookbook">Lookbook</BSNav.Link>
              <BSNav.Link className="blackFont" href="/shop-collections">Shop Collections</BSNav.Link>
              <BSNav.Link className="blackFont" href="/sustainability">Sustainability</BSNav.Link>
              <BSNav.Link className="blackFont" href="/our-story">Our Story</BSNav.Link>
            </BSNav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </div>
  );
}
