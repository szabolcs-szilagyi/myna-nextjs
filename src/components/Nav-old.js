import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: '',
      cart: './cart.png'
    };
    this.handleChange = this.handleChange.bind(this);
    this.cartHover = this.cartHover.bind(this);
    this.cartNormal = this.cartNormal.bind(this);
  }
  handleChange () {
  }
  cartHover () {
    this.setState({ cart: './cart-b.png' });
  }
  cartNormal () {
    this.setState({ cart: './cart.png' });
  }
  componentDidMount() {
    var element = document.getElementById("dropdown-custom-components");
    element.classList.remove("dropdown-toggle");
    element.classList.remove("btn");
    element.classList.remove("btn-secondary");
  }
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-2">
            <a href="/"><img className="logo" src="./logo.png" alt="MYNA logo" /></a>
          </div>
          <div className="col-md-8 capitalLetters">
            <ul className="navMenu">
              <li><a href="/lookbook">Lookbook</a></li>
              <li>
                <Dropdown>
                  <Dropdown.Toggle variant="secondary" id="dropdown-custom-components" className="capitalLetters noPadding">Shop Collections</Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="/love-and-light">Love & Light</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Consciously Beautiful</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">View all items</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Dresses</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Tops</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Bottoms</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Basics</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
              <li><a href="#">Sustainability</a></li>
              <li><a href="/our-story">Our Story</a></li>
            </ul>
          </div>
          <div className="col-md-2">
            <div className="row capitalLetters">
              <div className="col-md-7 ce padtop50px">
                <a className="menu" href="#">My Account</a>
              </div>
              <div className="col-md-5 ce padtop43px navCart">
                <a className="menu" href="#" onMouseEnter={this.cartHover} onMouseLeave={this.cartNormal}><img src={this.state.cart} width="35" height="35" />(2)</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
