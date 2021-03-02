import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import {API_SERVER as API_SERVER} from '../src/constants';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const session = cookies.get('session');

class Banner extends Component {
  render() {
    if (Date.now() > new Date('2021-01-01')) return (<div></div>);

    return (
      <div id="banner" className="row">
        Enjoy FREE delivery in December
      </div>
    );
  }
}

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myEmail: '',
      cart: './cart.png',
      inCart: '0'
    };
    this.amILoggedIn = this. amILoggedIn.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.cartHover = this.cartHover.bind(this);
    this.cartNormal = this.cartNormal.bind(this);
    this.getInCart = this.getInCart.bind(this);
  }
  amILoggedIn () {
    fetch(API_SERVER + 'listen.php?part=amiloggedin&sessiontoken=' + session)
    .then(response => response.json())
		.then(output => {
      let data = output;
      let tmp = data['email'];
      if (tmp != "nodata") {
        this.setState({ myEmail: tmp });
      }
    })
    .catch(error => console.log(error.message));
  }
  handleChange () {
  }
  cartHover () {
    this.setState({ cart: './cart-b.png' });
  }
  cartNormal () {
    this.setState({ cart: './cart.png' });
  }
  getInCart () {
    fetch(API_SERVER + 'listen.php?part=getproductsnumberincart&sessiontoken=' + session)
    .then(response => response.json())
		.then(output => {
      let data = output;
      let tmp = data['nr'];
      if (this.state.inCart !== tmp) this.setState({ inCart: tmp });
    })
    .catch(error => console.log(error.message));
  }
  componentDidUpdate() {
    this.getInCart ();
  }
  componentDidMount() {
    var element = document.getElementById("dropdown-custom-components");
    this.getInCart ();
  }
  render() {
    return (
      <div>
        <div className="desktopNav">
          <div className="row">
            <div className="col-md-2">
              <a href="/"><img className="logoMain" src="./logo.png" alt="MYNA logo" /></a>
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
                <div className="col-md-5 ce padtop43px navCart">
                  <a className="menu" href="/checkout" onMouseEnter={this.cartHover} onMouseLeave={this.cartNormal}><img src={this.state.cart} width="35" height="35" />({this.state.inCart})</a>
                </div>
              </div>
            </div>
          </div>
          <Banner />
        </div>
        <div className="tabNav">
          <div className="row">
            <div className="col-md-1" />
            <div className="col-md-2">
              <a href="/"><img src="./logo.png" alt="MYNA logo" /></a>
            </div>
            <div className="col-md-1" />
            <div className="col-md-4 ce menu">
              <div className="padtop50px blackFont"><a href="/my-account">My Account</a></div>
            </div>
            <div className="col-md-4 ce">
              <div className="padtop43px blackFont"><a className="padtop43px" href="/checkout" onMouseEnter={this.cartHover} onMouseLeave={this.cartNormal}><img src={this.state.cart} width="35" height="35" />({this.state.inCart})</a></div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3 ce menu">
              <div className="padtop43px blackFont"><a href="/lookbook">Lookbook</a></div>
            </div>
            <div className="col-md-3 ce menu">
              <div className="padtop43px blackFont"><a href="/autumn-collection">Shop Collections</a></div>
            </div>
            <div className="col-md-3 ce menu">
              <div className="padtop43px blackFont"><a href="/sustainability">Sustainability</a></div>
            </div>
            <div className="col-md-3 ce menu">
              <div className="padtop43px blackFont"><a href="/our-story">Our Story</a></div>
            </div>
          </div>
          <Banner />
        </div>
        <div className="mobileNav">
          <div className="row">
            <div className="col-md-12 ce">
              <a href="/"><img src="./logo.png" alt="MYNA logo" /></a>
              <div className="blackFont"><a href="/my-account">My Account</a></div>
              <div className="blackFont padtop10px"><a href="/checkout" onMouseEnter={this.cartHover} onMouseLeave={this.cartNormal}><img src={this.state.cart} width="35" height="35" />({this.state.inCart})</a></div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 ce menu">
              <div className="blackFont padtop10px"><a href="/lookbook">Lookbook</a></div>
              <div className="blackFont padtop10px"><a href="/autumn-collection">Shop Collections</a></div>
              <div className="blackFont padtop10px"><a href="/sustainability">Sustainability</a></div>
              <div className="blackFont padtop10px"><a href="/our-story">Our Story</a></div>
            </div>
          </div>
          <Banner />
        </div>
      </div>
    );
  }
}
