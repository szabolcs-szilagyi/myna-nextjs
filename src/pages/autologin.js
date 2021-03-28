import React, { Component } from 'react';
import {API_SERVER as API_SERVER} from '../constants';
import fetch from 'isomorphic-unfetch';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const session = cookies.get('session');

export default class Ping extends Component {
  constructor(props) {
    super(props);
    this.state = {
      session: ''
    };
    this.handleRequest = this.handleRequest.bind(this);
    this.redirect = this.redirect.bind(this);
  }
  handleRequest () {
    let searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('part')) {
      let part = searchParams.get('part');

      if (part == "login") {
        if (searchParams.has('token')) {
          let token = searchParams.get('token');
          let email = searchParams.get('email');
          fetch(API_SERVER + 'listen.php?part=login&logintoken=' + token + '&email=' + email + '&sessiontoken=' + session, {mode: 'no-cors'});
        }
      }

    }
  }
  redirect () {
    window.location.href = "/my-account";
  }
  componentDidMount() {
    setTimeout(this.handleRequest, 100);
    setTimeout(this.redirect, 500);
  }
  render() {
    return (
      <div></div>
    );
  }
}
