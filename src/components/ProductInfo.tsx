import React, { Component } from 'react';

import SizeInfo from '../components/SizeInfo';

function DescButton({ id, text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="border-0 capitalLetters mediumFont blackFont"
      style={{
        'backgroundColor': 'inherit'
      }}
      id={id}
    >{text}</button>
  );
}

export default class ProductInfo extends Component {
  state: any;
  props: any;

  constructor(props) {
    super(props);

    this.state = {
      descStyle: { display: 'block' },
      compCareStyle: { display: 'none' },
      sizeInfoStyle: { display: 'none' },
      deliveryStyle: { display: 'none' },
    };

    this.productInfoHandling = this.productInfoHandling.bind(this);
  }

  productInfoHandling(e) {
    const currentId = e.currentTarget.id;

    if (currentId === 'productDesc') {
      this.setState({
        descStyle: { display: 'block' },
        compCareStyle: { display: 'none' },
        sizeInfoStyle: { display: 'none' },
        deliveryStyle: { display: 'none' },
      });
    } else if (currentId === 'productComp') {
      this.setState({
        descStyle: { display: 'none' },
        compCareStyle: { display: 'block' },
        sizeInfoStyle: { display: 'none' },
        deliveryStyle: { display: 'none' },
      });
    } else if (currentId === 'productSize') {
      this.setState({
        descStyle: { display: 'none' },
        compCareStyle: { display: 'none' },
        sizeInfoStyle: { display: 'block' },
        deliveryStyle: { display: 'none' },
      });
    } else if (currentId === 'productDeli') {
      this.setState({
        descStyle: { display: 'none' },
        compCareStyle: { display: 'none' },
        sizeInfoStyle: { display: 'none' },
        deliveryStyle: { display: 'block' },
      });
    }
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-sm-6 col-xl-3">
            <DescButton
              onClick={this.productInfoHandling}
              id="productDesc"
              text="Description"
            />
          </div>
          <div className="col-sm-6 col-xl-3">
            <DescButton
              onClick={this.productInfoHandling}
              id="productComp"
              text="Composition & Care"
            />
          </div>
          <div className="spacer10px d-none d-sm-block d-xl-none"></div>
          <div className="col-sm-6 col-xl-3">
            <DescButton
              onClick={this.productInfoHandling}
              id="productSize"
              text="Size"
            />
          </div>
          <div className="col-sm-6 col-xl-3">
            <DescButton
              onClick={this.productInfoHandling}
              id="productDeli"
              text="Delivery"
            />
          </div>
        </div>
        <div className="spacer50px"></div>
        <div className="row">
          <div className="col-md-12">
            <div
              style={this.state.descStyle}
              className="productInfoContainer"
              dangerouslySetInnerHTML={{ __html: this.props.description }}
            ></div>
            <div
              style={this.state.compCareStyle}
              className="productInfoContainer"
              dangerouslySetInnerHTML={{ __html: this.props.compCare }}
            ></div>
            <div
              style={this.state.sizeInfoStyle}
              className="productInfoContainer"
            ><SizeInfo /></div>
            <div
              style={this.state.deliveryStyle}
              className="productInfoContainer"
            >
              <div className="ju">
                Receive your favourite items(s) within 5 to 7 days once shipped. For countries
                outside of Europe shipping may take longer, please enquire for specific country. All
                items are shipped within 3 business days from placing your order, with the exception
                of pre-ordered pieces. Pre-order pieces are made within 1 to 2 weeks. Email us at <a href="mailto:connect@mynalabel.com" className="blackFont">connect@mynalabel.com</a>.
                You have 14 days to change your mind. Sale orders are non refundable.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

