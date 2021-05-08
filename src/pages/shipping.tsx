import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'universal-cookie';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Ping from '../components/Ping';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
const cookies = new Cookies();
const hash = cookies.get('hash');

export default class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nextPage: ''
    };

    this.connectionAlive = this.connectionAlive.bind(this);

  }

  connectionAlive() {

  }

  componentDidUpdate() {
  }
  componentDidMount() {
    console.log (window.location.pathname);
  }
  render() {
		return (
			<Container fluid>
      <Header />
        <Nav />
        <Ping />
          <div className="spacer50px" />
          <div className="row">
            <div className="col-md-12 ce capitalLetters">
              <h1><strong>Shipping</strong></h1>
            </div>
          </div>
        <div className="spacer50px" />
        <div className="row">
          <div className="col-md-2" />
          <div className="col-md-8">
            <p>Your pieces are shipped by 100% carbon offset shipping, with international tracking where available.</p>
            <p>Estimated shipping times are as follows: <br />
              Europe - 3 to 7 business days <br />
              Rest of the World - 7 to 10 business days <br />
              We ship within 3 days of placing order, with the exception of pre-ordered pieces, and you will receive email notification with your tracking number. <br />
              Pre-order pieces are made within 1 to 2 weeks. Email us at <a href="mailto:connect@mynalabel.com" className="blackFont">connect@mynalabel.com</a>.
            </p>
            <p>Customs and import taxes: <br />
              Customers are responsible for any customs and import taxes that may apply. MYNA is not responsible for delays due to customs.
            </p>
            <div className="spacer50px" />
            <h1 className="capitalLetters ce"><strong>Returns and Exchanges</strong></h1>
            <div className="spacer50px" />
            <p>If you are unhappy with your order, please contact us at <a href="mailto:connect@mynalabel.com" className="blackFont">connect@mynalabel.com</a> to let us know and we will assist you as well as we can.</p>
            <p>Returns and exchanges: <br />
              If you are otherwise unsatisfied with an item, it can be returned provided you contact us within 14 days of delivery and ship the item back within 21 days of delivery. <br />
              Final sale orders are exempt and cannot be returned and refunded.</p>
            <p>Conditions of return: <br />
              Customers are responsible for return shipping costs and for the safe receipt by MYNA of any returned items.</p>
            <p>Where an item is being returned from outside the EU, please clearly mark the package as a return to ensure no customs costs are incurred. MYNA cannot be held responsible for customs costs relating to returned items.</p>
            <p>In the case that a returned item is not received by MYNA in its original condition, the customer is responsible for any loss in value.</p>
          </div>
          <div className="col-md-2" />
        </div>
        <div className="spacer50px" />
        <Footer />
      </Container>
		);
	}
}
