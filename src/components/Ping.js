import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import {
  API_SERVER,
  API_PATH,
} from '../constants';
const cookies = new Cookies();
//const hash = cookies.get('hash');
const session = cookies.get('session');

export default class Ping extends Component {
  constructor(props) {
    super(props);
    this.state = {
      session: ''
    };
    this.ping = this.ping.bind(this);
    this.redirect = this.redirect.bind(this);
  }
  ping() {
    if (session == 'undefined') {
      fetch(API_SERVER + API_PATH + '?part=ping')
      .then(response => response.json())
  		.then(output => {
        let data = output;
        let tmp = data['sessiontoken'];
        cookies.set("session", tmp, { maxAge: 1800 });
      })
      .catch(error => console.log(error.message));
      setTimeout(this.redirect, 1000);
    }
    if (session != 'undefined') {
      fetch(API_SERVER + API_PATH + '?part=ping&sessiontoken=' + session)
      .then(response => response.json())
  		.then(output => {
        let data = output;
        let tmp = data['sessiontoken'];
        cookies.set("session", tmp, { maxAge: 1800 });
      })
      .catch(error => console.log(error.message));
    }
  }
  redirect () {
    window.location.href = "/";
  }
  componentDidMount() {
    this.ping ();
  }
  render() {
    return (
      <div></div>
    );
  }
}
