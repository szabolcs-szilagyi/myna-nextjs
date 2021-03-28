import React, { Component } from 'react';
import {API_SERVER as API_SERVER} from '../constants';
import fetch from 'isomorphic-unfetch';

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

      if (part == "subscribenewsletter") {
        if (searchParams.has('token')) {
          let token = searchParams.get('token');
          let email = searchParams.get('email');
          fetch(API_SERVER + 'listen.php?part=confirmnewslettersubscription&token=' + token, {mode: 'no-cors'});
          fetch(API_SERVER + 'amazon-ses-smtp.php?part=confirmnewslettersubscription&email=' + email + '&token=' + token, {mode: 'no-cors'});
        }
      }

      if (part == "unsubscribe") {
        if (searchParams.has('token')) {
          let token = searchParams.get('token');
          let email = searchParams.get('email');
          fetch(API_SERVER + 'listen.php?part=delnewslettersubscription&token=' + token + '&email=' + email, {mode: 'no-cors'});
          fetch(API_SERVER + 'amazon-ses-smtp.php?part=delnewslettersubscription&email=' + email + '&token=' + token, {mode: 'no-cors'});
        }
      }

    }
  }
  redirect () {
    window.location.href = "/";
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
