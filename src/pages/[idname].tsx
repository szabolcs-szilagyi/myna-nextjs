import { PropsWithChildren, useState } from 'react';

import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Container from 'react-bootstrap/Container';
import PhotoViewer from '../components/PhotoViewer';
import ProductInfo from '../components/ProductInfo';

import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';
import Link, { LinkProps } from 'next/link';
import { addProductToCart, getAvailability, loadProductDetails } from '../services/nestjs-server';

const DEFAULT_AVAILABLE = 'Available for pre-order';

function LinkComp({ href, children, ...props }: PropsWithChildren<LinkProps>) {
  return (<Link href={href}><a {...props}>{children}</a></Link>);
}

export async function getStaticProps({ params: { idname } }) {
  const props = await loadProductDetails(idname);
  return { props };
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { idname: 'adel-jacket' } },
      { params: { idname: 'alyss-dress' } },
      { params: { idname: 'aster-green' } },
      { params: { idname: 'aster-sand' } },
      { params: { idname: 'bella-blouse' } },
      { params: { idname: 'bella-hand-painted-blouse' } },
      { params: { idname: 'calla-cream' } },
      { params: { idname: 'dahlia-blouse' } },
      { params: { idname: 'deli-shorts' } },
      { params: { idname: 'delphi-culottes' } },
      { params: { idname: 'flora-wrap-dress' } },
      { params: { idname: 'gea-cream' } },
      { params: { idname: 'helen-blazer' } },
      { params: { idname: 'helia-bracelet' } },
      { params: { idname: 'holly-bracelet' } },
      { params: { idname: 'iris-vest' } },
      { params: { idname: 'ivy-cream' } },
      { params: { idname: 'leila-shirt' } },
      { params: { idname: 'leya-wrap-dress' } },
      { params: { idname: 'lili-top' } },
      { params: { idname: 'lili-top-satin' } },
      { params: { idname: 'lilium-trousers' } },
      { params: { idname: 'lisia-dress' } },
      { params: { idname: 'lola-oversized-shirt' } },
      { params: { idname: 'lotus-sand' } },
      { params: { idname: 'magna-scarf' } },
      { params: { idname: 'marigold-trench-coat' } },
      { params: { idname: 'mary-dress' } },
      { params: { idname: 'neeja-top' } },
      { params: { idname: 'nolia-dustpink' } },
      { params: { idname: 'peri-blouse' } },
      { params: { idname: 'peri-sis-handkerchief' } },
      { params: { idname: 'raisa-dress' } },
      { params: { idname: 'reeva-denim-jacket' } },
      { params: { idname: 'sari-denim-shorts' } },
      { params: { idname: 'senna-skirt' } },
      { params: { idname: 'susan-dress' } },
      { params: { idname: 'tilia-blouse' } },
      { params: { idname: 'tilja-top' } },
      { params: { idname: 'tuli-dress' } },
      { params: { idname: 'viola-dress' } },
    ],
    fallback: true
  };
}

enum ECartButtonTexts {
  ADD_TO_CART = 'ADD TO CART',
  ADDED_TO_CART = 'ADDED TO CART',
}

const { ADD_TO_CART, ADDED_TO_CART } = ECartButtonTexts;

export default function Index (props: any) {
  const router = useRouter();
  const { t, lang } = useTranslation('product');

  const idName = router.query.idname;
  const isOneSize = props.isOneSize;

  const [state, setState] = useState({
    cartButtonVisibility: 'visible',
    addToCart: ADD_TO_CART,
    productIdToCart: '',
    idName,
    currency: '€',
    avby: DEFAULT_AVAILABLE,
    productName: '',
    productColor: '',
    productPrice: '',
    description: '',
    compCare: '',
    photos: {
      photo1: '',
      photo2: '',
      photo3: '',
      photo4: '',
      photo5: '',
      photo6: '',
      photo7: '',
      photo8: '',
      photo9: '',
    },
    lastItemsDate: null,
    ...props
  });
  const [selectedSize, setSelectedSize] = useState(isOneSize ? 'onesize' : '0');

  function defaultButton() {
    setState({
      ...state,
      addToCart: ADD_TO_CART,
    });
    checkAvailability(selectedSize, state.idName);
  }

  async function checkAvailability(size: string, idName: string) {
    if (size === '0') return;

    const availability = await getAvailability(idName, size);

    if (availability !== null && availability > 0) {
      setState({
        ...state,
        avby: DEFAULT_AVAILABLE,
        cartButtonVisibility: 'visible',
      });
    } else if(availability === 0) {
      setState({
        ...state,
        avby: 'Pre-Order / Contact Us',
        cartButtonVisibility: 'invisible',
      });
    } else if(availability === null) {
      setState({
        ...state,
        avby: 'Not Available',
        cartButtonVisibility: 'invisible',
      });
    }
  }

  async function addToCart() {
    const size = selectedSize;

    if (state.addToCart == ADD_TO_CART && size != '0') {
      const idName = state.idName;

      await addProductToCart(idName, size);

      setState({
        ...state,
        addToCart: ADDED_TO_CART,
        lastItemsDate: Date.now(),
      });
      setTimeout(defaultButton, 3000);
    }
  }

  function handleSizeChange(e) {
    const newSize = e.target.value
    setSelectedSize(newSize);
    checkAvailability(newSize, state.idName);
  }

  const {
    productName,
    description,
    compCare,
  } = lang === 'pl' ?
      {
        productName: state.namePl ?? state.productName,
        description: state.descriptionPl ?? state.description,
        compCare: state.compositionAndCarePl ?? state.compCare,
      } :
      state;

  return (
    <Container fluid>
      <Header path={productName} />
      <Nav lastItemsDate={state.lastItemsDate} />
      <div className="spacer50px"></div>
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-10">
          <div className="row">

            <PhotoViewer photos={state.photos} />

            <div className="col-md-6 ce">
              <div className="row">
                <div className="col-md-12">
                  <h1
                    className="capitalLetters"
                    data-cy="productTitle"
                  >
                    {productName} | {state.productColor} | {state.currency}{state.productPrice}
                  </h1>
                </div>
              </div>
              <div className="spacer50px"></div>

              <ProductInfo
                description={description}
                compCare={compCare}
              />

              <div className="spacer50px"></div>
              <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-6 left">
                  <select
                    id="chooseSize"
                    className={state.isOneSize ?
                               'sizeButton invisible' :
                               'sizeButton'}
                    value={selectedSize}
                    onChange={handleSizeChange}
                    data-cy="sizeSelector"
                  >
                    <option value="0">{t('CHOOSE SIZE')}</option>
                    <option value="xs">XS</option>
                    <option value="s">S</option>
                    <option value="m">M</option>
                    <option value="ml">ML</option>
                    <option value="l">L</option>
                  </select>
                  <div className="spacer25px"></div>
                  <div className={state.cartButtonVisibility}>
                    <div className="noBorder mediumFont">
                      <button
                        type="button"
                        className="cartButton"
                        onClick={addToCart}
                        data-cy="addToCartButton"
                      >{t(state.addToCart)}</button>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div
                    className="capitalLetters pad8px"
                    data-cy="availablityIndicator"
                  >
                    {t(state.avby)}
                  </div>
                </div>
                <div className="col-md-1"></div>
              </div>
              <div className="spacer25px"></div>
              <div className="row">
                <div className="col-md-12">
                  <div className="productInfoContainer noBorder mediumFont">
                    <div className="mediumFont ju">
                      <Trans
                        i18nKey="product:each-item"
                        components={[
                          <a href="mailto:connect@mynalabel.com" className="blackFont" />,
                          <LinkComp {...{ className: 'blackFont', href: '/shipping' }} />,
                        ]}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-1"></div>
      </div>
      <div className="spacer50px"></div>
      <Footer />
    </Container>
  );
}
