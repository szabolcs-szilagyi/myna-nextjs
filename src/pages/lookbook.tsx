import Container from 'react-bootstrap/Container';
import Link from 'next/link';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation'

import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import style from './lookbook.module.css';
import usePing from '../lib/use-ping';

import img01 from '../../public/lookbook/01.jpg';
import img02 from '../../public/lookbook/02.jpg';
import img03 from '../../public/lookbook/03.jpg';
import img04 from '../../public/lookbook/04.jpg';
import img05 from '../../public/lookbook/05.jpg';
import img06 from '../../public/lookbook/06.jpg';
import img07 from '../../public/lookbook/07.jpg';

type LookbookImageProps = {
  imageSrc: string,
  height: number,
  width: number,
  alt?: string,
  additionalClass?: string,
}

function LookbookImage({ imageSrc, height, width, alt = '', additionalClass = '' }: LookbookImageProps) {
  return (
    <div className={style.imageContainer + ' ' + additionalClass} >
      <Link href="/shop-collections"><a>
        <Image
          layout="responsive"
          height={height}
          width={width}
          src={imageSrc}
          alt={alt}
        />
      </a></Link>
    </div>
  );
}

export default function Lookbook() {
  const { t } = useTranslation('common');
  usePing();

  return (
    <Container fluid>
      <Header description="lookbook" />
      <Nav />
      <div className="spacer50px"></div>
      <div className="row">
        <div className="col-md-12 ce capitalLetters">
          <h1><strong>Lookbook</strong></h1>
        </div>
      </div>
      <div className="spacer50px"></div>

      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <div className="row">
            <div className="col-md-7 ce">
              <LookbookImage
                imageSrc={img01.src}
                height={img01.height}
                width={img01.width}
                additionalClass="col-md-12 px-0"
              />
              <div className={' col-md-12 px-5 py-5'}>
                <p className={style.quote} >
                  {t('lookbook-caption')}
                </p>
              </div>
            </div>
            <LookbookImage
              imageSrc={img02.src}
              height={img02.height}
              width={img02.width}
              additionalClass="col-md-5"
            />
          </div>
          <div className="col-md-1 ce"></div>
        </div>
        <div className="col-md-2"></div>
        <div className="spacer25px"></div>
      </div>

      <div className="row">
        <div className="col-md-2"></div>
        <LookbookImage
          imageSrc={img03.src}
          height={img03.height}
          width={img03.width}
          additionalClass="col-md-8"
        />
        <div className="col-md-2"></div>
        <div className="spacer25px"></div>
      </div>

      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <div className="row">
            <div className="col-md-6 ce">
              <LookbookImage
                imageSrc={img04.src}
                height={img04.height}
                width={img04.width}
              />
              <div className="spacer25px d-block d-md-none"></div>
            </div>
            <div className="col-md-6" >
              <LookbookImage
                imageSrc={img05.src}
                height={img05.height}
                width={img05.width}
              />
              <div className="spacer25px"></div>
              <LookbookImage
                imageSrc={img06.src}
                height={img06.height}
                width={img06.width}
              />
            </div>
          </div>
        </div>
        <div className="col-md-2"></div>
        <div className="spacer25px"></div>
      </div>

      <div className="row">
        <div className="col-md-2"></div>
        <LookbookImage
          imageSrc={img07.src}
          height={img07.height}
          width={img07.width}
          additionalClass="col-md-8"
        />
        <div className="spacer25px"></div>
        <div className="col-md-2"></div>
      </div>

      <Footer />
    </Container>
  );
}
