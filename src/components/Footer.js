import React, { Component } from 'react';
import {
  API_SERVER,
  API_PATH,
} from '../constants';
import fetch from 'isomorphic-unfetch';

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: '',
      value: '',
      token: '',
      placeHolder: 'EMAIL HERE'
    };
    this.handleChange = this.handleChange.bind(this);
    this.subscribePressed = this.subscribePressed.bind(this);
    this.getToken = this.getToken.bind(this);
    this.sendMail = this.sendMail.bind(this);
  }
  handleChange (event) {
    this.setState({value: event.target.value});
  }
  subscribePressed () {
    setTimeout(this.getToken, 100);
    setTimeout(this.sendMail, 500);
  }
  getToken () {
    fetch(API_SERVER + API_PATH + '?part=setnewslettersubscription&email=' + this.state.value)
    .then(response => response.json())
		.then(output => {
      let data = output;
      let tmp = data['token'];
      this.setState({ token: tmp });
    })
    .catch(error => console.log(error.message));
  }
  sendMail () {
    fetch(API_SERVER + 'amazon-ses-smtp.php?part=subscribenewsletter&email=' + this.state.value + '&token=' + this.state.token, {mode: 'no-cors'});
    this.setState({ placeHolder: 'check your mailbox', value: '' });
  }
  componentDidMount() {
  }
  render() {
    return (
      <div>
        <div className="spacer50px"></div>
        <hr />
        <div className="spacer25px"></div>
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-6">
                <div className="email_newsletter">
                  <div className="row">
                    <div className="col-md-8">
                      <input type="email" name="emailNewsletter" value={this.state.value} placeholder={this.state.placeHolder} onChange={this.handleChange} />
                    </div>
                    <div className="col-md-4 ce">
                      <button className="nlsb" onClick={this.subscribePressed}>SUBSCRIBE</button>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 ce">
                      <div className="spacer25px" />
                      We respect your privacy.
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 ce">
                      <img className="logo" src="/logo.png" alt="MYNA logo" />
                    </div>
                    <div className="col-6 text-right">
                      <a
                        href="https://www.facebook.com/mynalabel"
                        target="fb-mynalabel"
                      ><img
                         src="/facebook.svg"
                         alt="facebook"
                         width="30"
                         heigth="30"
                       /></a>
                    </div>
                    <div className="col-6">
                      <a
                        href="https://www.instagram.com/mynalabel/"
                        target="insta-mynalabel"
                      ><img
                         src="/instagram.svg"
                         alt="instagram"
                         width="30"
                         heigth="30"
                       /></a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-4"></div>
                  <div className="col-md-8">
                    <p><a href="/our-story" className="blackFont">Our Story</a></p>
                    <p><a href="/sustainability" className="blackFont">Sustainability</a></p>
                    <p><a href="/shipping" className="blackFont">Shipping & Returns</a></p>
                    <p><a href="/size-measurement" className="blackFont">Size & Measurement</a></p>
                    <p><a href="/privacy-contact" className="blackFont">Privacy & Contact</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-2"></div>
          <div className="spacer50px"></div>
        </div>
      </div>
    );
  }
}
