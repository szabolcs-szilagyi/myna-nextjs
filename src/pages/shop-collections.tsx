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
    ['consciously-beautiful', 'mary-dress'],
    ['consciously-beautiful', 'marigold-trench-coat'],
    ['consciously-beautiful', 'helen-blazer'],
    ['consciously-beautiful', 'holly-bracelet'],
    ['consciously-beautiful', 'alyss-dress'],
    ['consciously-beautiful', 'peri-sis-handkerchief'],
    ['consciously-beautiful', 'reeva-denim-jacket'],
    ['consciously-beautiful', 'tilia-blouse'],
    ['consciously-beautiful', 'senna-skirt'],
    ['consciously-beautiful', 'delphi-culottes'],
    ['consciously-beautiful', 'peri-blouse'],
    ['consciously-beautiful', 'flora-wrap-dress'],
    ['consciously-beautiful', 'calla-cream'],
    ['consciously-beautiful', 'helia-bracelet'],
    ['love-and-light', 'lola-oversized-shirt'],
    ['love-and-light', 'gea-cream'],
    ['love-and-light', 'magna-scarf'],
    ['love-and-light', 'nolia-dustpink'],
    ['love-and-light', 'ivy-cream'],
    ['love-and-light', 'aster-green'],
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
      mainPhoto: `/product_photos/${productDetails.pic1}`,
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
        <div className="col-md-12 ce capitalLetters">
          <h1><strong>{t('Shop Collections')}</strong></h1>
        </div>
      </div>
      <div className="row justify-content-md-center">
        <div className="col-md-2 ce capitalLetters">
          <a href="#consciously-beautiful" className="smallFont ce blackFont">Consciously Beautiful</a>
        </div>
        <div className="col-md-2 ce capitalLetters">
          <a href="#love-and-light" className="smallFont ce blackFont">Love and Light</a>
        </div>
      </div>

      <div className="spacer50px" />
      <div className="row">
        <div id="consciously-beautiful" className="col-md-12 ce capitalLetters">
          <h5><strong>Consciously Beautiful</strong></h5>
        </div>
      </div>

      {(groupProducts(collectionData['consciously-beautiful']))}

      <div className="spacer50px" />
      <div className="row">
        <div id="love-and-light" className="col-md-12 ce capitalLetters">
          <h5><strong>Love and Light</strong></h5>
        </div>
      </div>

      {(groupProducts(collectionData['love-and-light']))}

      <Footer />
    </Container>
  );
}
