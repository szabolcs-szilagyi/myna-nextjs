import Container from 'react-bootstrap/Container';
import Link from 'next/link';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation'

import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import style from './lookbook.module.css';
import usePing from '../lib/use-ping';

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
                imageSrc="/lookbook/01.jpg"
                height={853}
                width={1280}
                additionalClass="col-md-12 px-0"
              />
              <div className={' col-md-12 px-5 py-5'}>
                <p className={style.quote} >
                  {t('lookbook-caption')}
                </p>
              </div>
            </div>
            <LookbookImage
              imageSrc="/lookbook/02.jpg"
              height={1280}
              width={853}
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
          imageSrc="/lookbook/03.jpg"
          height={853}
          width={1280}
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
                imageSrc="/lookbook/04.jpg"
                height={1280}
                width={853}
              />
              <div className="spacer25px d-block d-md-none"></div>
            </div>
            <div className="col-md-6" >
              <LookbookImage
                imageSrc="/lookbook/05.jpg"
                height={853}
                width={1280}
              />
              <div className="spacer25px"></div>
              <LookbookImage
                imageSrc="/lookbook/06.jpg"
                height={853}
                width={1280}
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
          imageSrc="/lookbook/07.jpg"
          height={853}
          width={1280}
          additionalClass="col-md-8"
        />
        <div className="spacer25px"></div>
        <div className="col-md-2"></div>
      </div>

      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <div className="row">
            <div className="col-md-6" >
              <LookbookImage
                imageSrc="/lookbook/08.jpg"
                height={1280}
                width={853}
              />
              <div className="spacer25px d-block d-md-none"></div>
            </div>
            <div className="col-md-6 ce">
              <LookbookImage
                imageSrc="/lookbook/09.jpg"
                height={1280}
                width={853}
              />
            </div>
          </div>
        </div>
        <div className="col-md-2"></div>
      </div>

      <Footer />
    </Container>
  );
}
