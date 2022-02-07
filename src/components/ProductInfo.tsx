import { useState, MouseEvent } from 'react';
import Trans from 'next-translate/Trans';

import SizeInfo from '../components/SizeInfo';
import useTranslation from 'next-translate/useTranslation';

type TDescButtonProps = {
  id: string,
  text: string,
  onClick: {(event: MouseEvent<HTMLButtonElement>): void},
  'data-cy': string,
};

function DescButton(props: TDescButtonProps) {
  const additionalProps = props['data-cy'] ? { 'data-cy': props['data-cy'] } : {};
  return (
    <button
      onClick={props.onClick}
      className="border-0 capitalLetters mediumFont blackFont"
      style={{
        'backgroundColor': 'inherit'
      }}
      id={props.id}
      {...additionalProps}
    >{props.text}</button>
  );
}

type TProductInfoProps = {
  description: string,
  compCare: string,
};

export default function ProductInfo(props: TProductInfoProps) {
  const [state, setState] = useState({
    descStyle: { display: 'block' },
    compCareStyle: { display: 'none' },
    sizeInfoStyle: { display: 'none' },
    deliveryStyle: { display: 'none' },
  });
  const { t } = useTranslation('product');

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
            text={t('Description')}
            data-cy="descriptionButton"
          />
        </div>
        <div className="col-sm-6 col-xl-3">
          <DescButton
            onClick={productInfoHandling}
            id="productComp"
            text={t('Composition & Care')}
            data-cy="compositionAndCareButton"
          />
        </div>
        <div className="spacer10px d-none d-sm-block d-xl-none"></div>
        <div className="col-sm-6 col-xl-3">
          <DescButton
            onClick={productInfoHandling}
            id="productSize"
            text={t('Size')}
            data-cy="sizeButton"
          />
        </div>
        <div className="col-sm-6 col-xl-3">
          <DescButton
            onClick={productInfoHandling}
            id="productDeli"
            text={t('Delivery')}
            data-cy="deliveryButton"
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
            data-cy="descriptionPane"
          ></div>
          <div
            style={state.compCareStyle}
            className="productInfoContainer"
            dangerouslySetInnerHTML={{ __html: props.compCare }}
            data-cy="compositionAndCarePane"
          ></div>
          <div
            style={state.sizeInfoStyle}
            className="productInfoContainer"
            data-cy="sizePane"
          ><SizeInfo /></div>
          <div
            style={state.deliveryStyle}
            className="productInfoContainer"
            data-cy="deliveryPane"
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

