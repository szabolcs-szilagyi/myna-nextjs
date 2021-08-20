import React, { useState } from 'react';
import Trans from 'next-translate/Trans';

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

export default function ProductInfo(props) {
  const [state, setState] = useState({
    descStyle: { display: 'block' },
    compCareStyle: { display: 'none' },
    sizeInfoStyle: { display: 'none' },
    deliveryStyle: { display: 'none' },
  });

  function productInfoHandling(e) {
    const currentId = e.currentTarget.id;

    if (currentId === 'productDesc') {
      setState({
        descStyle: { display: 'block' },
        compCareStyle: { display: 'none' },
        sizeInfoStyle: { display: 'none' },
        deliveryStyle: { display: 'none' },
      });
    } else if (currentId === 'productComp') {
      setState({
        descStyle: { display: 'none' },
        compCareStyle: { display: 'block' },
        sizeInfoStyle: { display: 'none' },
        deliveryStyle: { display: 'none' },
      });
    } else if (currentId === 'productSize') {
      setState({
        descStyle: { display: 'none' },
        compCareStyle: { display: 'none' },
        sizeInfoStyle: { display: 'block' },
        deliveryStyle: { display: 'none' },
      });
    } else if (currentId === 'productDeli') {
      setState({
        descStyle: { display: 'none' },
        compCareStyle: { display: 'none' },
        sizeInfoStyle: { display: 'none' },
        deliveryStyle: { display: 'block' },
      });
    }
  }

  return (
    <div>
      <div className="row">
        <div className="col-sm-6 col-xl-3">
          <DescButton
            onClick={productInfoHandling}
            id="productDesc"
            text="Description"
          />
        </div>
        <div className="col-sm-6 col-xl-3">
          <DescButton
            onClick={productInfoHandling}
            id="productComp"
            text="Composition & Care"
          />
        </div>
        <div className="spacer10px d-none d-sm-block d-xl-none"></div>
        <div className="col-sm-6 col-xl-3">
          <DescButton
            onClick={productInfoHandling}
            id="productSize"
            text="Size"
          />
        </div>
        <div className="col-sm-6 col-xl-3">
          <DescButton
            onClick={productInfoHandling}
            id="productDeli"
            text="Delivery"
          />
        </div>
      </div>
      <div className="spacer50px"></div>
      <div className="row">
        <div className="col-md-12">
          <div
            style={state.descStyle}
            className="productInfoContainer"
            dangerouslySetInnerHTML={{ __html: props.description }}
          ></div>
          <div
            style={state.compCareStyle}
            className="productInfoContainer"
            dangerouslySetInnerHTML={{ __html: props.compCare }}
          ></div>
          <div
            style={state.sizeInfoStyle}
            className="productInfoContainer"
          ><SizeInfo /></div>
          <div
            style={state.deliveryStyle}
            className="productInfoContainer"
          >
            <div className="ju">
              <Trans
                i18nKey="product:receive-your"
                components={[<a href="mailto:connect@mynalabel.com" className="blackFont" />]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

