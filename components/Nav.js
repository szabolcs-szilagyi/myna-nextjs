import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

import Cookies from 'universal-cookie';
const cookies = new Cookies();
const session = cookies.get('session');

import {
  API_SERVER
} from '../src/constants';


function getInCart() {
  return fetch(API_SERVER + 'listen.php?part=getproductsnumberincart&sessiontoken=' + session)
    .then(response => response.json())
		.then(output => output.nr)
    .catch(error => console.log(error.message));
}

function Cart({ containerClass }) {
  const [inCart, setInCart] = useState(0);
  const [cartIcon, setCartIcon] = useState('/cart.png');

  useEffect(() => {
    getInCart()
      .then(numberOfProducts => setInCart(numberOfProducts));
  }, [inCart]);

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

export default function Nav() {
  return (
    <div>

      <div className="desktopNav">
        <div className="row">
          <div className="col-md-2">
            <a href="/"><img className="logoMain" src="/logo.png" alt="MYNA logo" /></a>
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
              <Cart containerClass="col-md-5 ce padtop43px navCart" />
            </div>
          </div>
        </div>
      </div>

      <div className="tabNav">
        <div className="row">
          <div className="col-md-1" />
          <div className="col-md-2">
            <a href="/"><img src="/logo.png" alt="MYNA logo" /></a>
          </div>
          <div className="col-md-1" />
          <div className="col-md-4 ce menu">
            <div className="padtop50px blackFont"><a href="/my-account">My Account</a></div>
          </div>
          <div className="col-md-4 ce">
            <Cart containerClass="padtop43px blackFont" />
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
        <div className="row">
          <div className="col-md-12 ce">
            <a href="/"><img src="/logo.png" alt="MYNA logo" /></a>
            <div className="blackFont"><a href="/my-account">My Account</a></div>
            <Cart containerClass="blackFont padtop10px" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 ce menu">
            <div className="blackFont padtop10px"><a href="/lookbook">Lookbook</a></div>
            <div className="blackFont padtop10px"><a href="/shop-collections">Shop Collections</a></div>
            <div className="blackFont padtop10px"><a href="/sustainability">Sustainability</a></div>
            <div className="blackFont padtop10px"><a href="/our-story">Our Story</a></div>
          </div>
        </div>
      </div>
    </div>
  );
}
