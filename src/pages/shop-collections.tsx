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
  const productsToRetrieve = [
    ['i-want-to-be-the-sea', 'liana-blouse-sunrise'],
    ['i-want-to-be-the-sea', 'liliana-overall'],
    ['i-want-to-be-the-sea', 'lilium-trousers'],
    ['i-want-to-be-the-sea', 'liana-blouse-ocean'],
    ['i-want-to-be-the-sea', 'neeja-top'],
    ['i-want-to-be-the-sea', 'hana-oversized-shirt'],
    ['i-want-to-be-the-sea', 'irisa-top'],
    ['i-want-to-be-the-sea', 'narci-skirt'],
    ['i-want-to-be-the-sea', 'aster-trousers-satin'],
    ['i-want-to-be-the-sea', 'aster-shorts-satin'],
    ['i-want-to-be-the-sea', 'aster-trousers-sand'],
    ['i-want-to-be-the-sea', 'aster-shorts-sand'],
    ['i-want-to-be-the-sea', 'viola-dress'],
    ['i-want-to-be-the-sea', 'leila-shirt'],
    ['i-want-to-be-the-sea', 'raisa-dress'],
    ['i-want-to-be-the-sea', 'adel-jacket'],
    ['i-want-to-be-the-sea', 'erica-sweatshirt'],
    ['i-want-to-be-the-sea', 'aster-frill'],
    ['i-want-to-be-the-sea', 'sari-denim-shorts'],
    ['i-want-to-be-the-sea', 'deli-shorts'],
    ['i-want-to-be-the-sea', 'susan-dress'],
    ['i-want-to-be-the-sea', 'rosa-dress'],
    ['i-want-to-be-the-sea', 'leya-dress'],
    ['i-want-to-be-the-sea', 'zinia-skirt'],
    ['i-want-to-be-the-sea', 'lola-oversized-shirt'],
    ['i-want-to-be-the-sea', 'marigold-trench-coat'],
    ['i-want-to-be-the-sea', 'delphi-culottes'],
    ['i-want-to-be-the-sea', 'gea-cream'],
    ['i-want-to-be-the-sea', 'ivy-cream'],
    ['i-want-to-be-the-sea', 'tilia-blouse'],
    ['i-want-to-be-the-sea', 'calla-cream'],
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
          <p>Summer sale 20% off on all items. Use discount code <pre style="display: inline;">summersale20</pre>.</p>
        </div>
      </div>

      <div className="spacer50px" />
      <div className="row">
        <div id="consciously-beautiful" className="col-md-12 ce capitalLetters">
          <h5><strong>I want to be the Sea</strong></h5>
        </div>
      </div>

      {(groupProducts(collectionData['i-want-to-be-the-sea']))}

      <Footer />
    </Container>
  );
}
