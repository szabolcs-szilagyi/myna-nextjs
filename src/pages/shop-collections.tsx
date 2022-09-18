import { chunk } from 'lodash';

import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Container from 'react-bootstrap/Container';
import SingleProductCard from '../components/SingleProductCard';

import {
  API_SERVER,
} from '../constants';
import { request } from '../lib/request';
import useTranslation from 'next-translate/useTranslation';
import usePing from '../lib/use-ping';
import getProductLink from '../lib/get-product-link';

type ColletcionTypes = 'consciously-beautiful' | 'love-and-light' | 'love-affair-collection';
type Product = {
  link: string,
  mainPhoto: string,
  name: string,
  price: string,
};

type TCollectionData = Partial<Record<ColletcionTypes, Product[]>>;

function createProductCard(product: Product) {
  if(!product) return (<></>);
  return (
    <SingleProductCard
      productPageLink={product.link}
      productImageLink={product.mainPhoto}
      productName={product.name}
      price={product.price}
    />
  );
}

function groupProducts(products: Product[] | undefined) {
  if (!products) return (<></>);

  const grouped = chunk(products, 2).map(([firstProduct, secondProduct], i) => {
    return (
      <div key={`${firstProduct.name}-${i}`} className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <div className="row">
            {createProductCard(firstProduct)}
            {createProductCard(secondProduct)}
          </div>
        </div>
        <div className="col-md-2"></div>
      </div>
    );
  });

  return (<>{grouped}</>);
}

export async function getStaticProps() {
  const title = 'modern-day-queen';
  const productsToRetrieve = [
    [title, 'kamala-trench-coat'],
    [title, 'zephyra-vest'],
    [title, 'daphne-cardigan'],
    [title, 'zinia-long-skirt'],
    [title, 'nolia-blouse'],
    [title, 'narci-midi-skirt'],
    [title, 'silene-long-coat'],
    [title, 'marigold-trench-coat'],
    [title, 'susan-dress'],
    [title, 'hebe-socks'],
    [title, 'erica-sweatshirt'],
    [title, 'aster-frill'],
    [title, 'lola-oversized-shirt'],
    [title, 'delphi-culottes'],
    [title, 'hanna-oversize-shirt'],
    [title, 'lilium-trousers'],
    [title, 'adel-jacket'],
    [title, 'calla-cream'],
    [title, 'raisa-dress'],
    [title, 'gea-cream'],
    [title, 'ivy-cream'],
  ]
  const collectionData: TCollectionData = {};

  for (const [collection, shortName] of productsToRetrieve) {
    const productDetails: any = (await request(`${API_SERVER}product`, {
      query: { idName: shortName },
      options: { json: true },
    }))[0];

    if(!collectionData[collection]) collectionData[collection] = [];
    collectionData[collection].push({
      link: `/${shortName}`,
      mainPhoto: getProductLink(productDetails.pic1),
      name: productDetails.name,
      price: `€${productDetails.price}`,
    });
  }

  return { props: { collectionData } };
}

type TShopCollectionsProps = {
  collectionData: TCollectionData,
}
export default function ShopCollections({ collectionData }: TShopCollectionsProps) {
  const { t } = useTranslation();
  usePing();

  return (
    <Container fluid>
      <Header description="shop-collections" />
      <Nav />
      <div className="spacer50px" />
      <div className="row">
        <div className="col-md-12 ce">
          <h1 className="capitalLetters"><strong>{t('Shop Collections')}</strong></h1>
        </div>
      </div>

      <div className="spacer50px" />
      <div className="row">
        <div id="consciously-beautiful" className="col-md-12 ce capitalLetters">
          <h5><strong>Modern Day Queen</strong></h5>
        </div>
      </div>

          {(groupProducts(collectionData['modern-day-queen']))}

      <Footer />
    </Container>
  );
}
