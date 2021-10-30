import Container from 'react-bootstrap/Container';
import Link from 'next/link';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation'

import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import style from './gallery.module.css';
import usePing from '../lib/use-ping';
import { ReactNode } from 'react';

type CustomImageProps = {
  imageSrc: string,
  height: number,
  width: number,
  alt?: string,
  additionalClass?: string,
}

function CustomImage({ imageSrc, height, width, alt = '', additionalClass = '' }: CustomImageProps) {
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

type ImageTrioProps = {
  first: string,
  second: string,
  third: string,
  children?: ReactNode,
}

function ImageTrio({ first, second, third, children }: ImageTrioProps) {
  return (
    <>
      <CustomImage
        imageSrc={`/gallery/${first}`}
        height={1280}
        width={853}
        additionalClass="col-md-4"
      />
      <div className="spacer25px d-block d-md-none"></div>
      <CustomImage
        imageSrc={`/gallery/${second}`}
        height={1280}
        width={853}
        additionalClass="col-md-4"
      />
      <div className="spacer25px"></div>
      <CustomImage
        imageSrc={`/gallery/${third}`}
        height={853}
        width={1280}
        additionalClass="col-md-8"
      />
      {children}
    </>
  )
}

export default function Gallery() {
  const { t } = useTranslation('common');
  usePing();

  return (
    <Container fluid>
      <Header />
      <Nav />
      <div className="spacer50px"></div>

      <div className="row">
        <div className="col-md-12 ce capitalLetters">
          <h1><strong>{t('Gallery-title')}</strong></h1>
        </div>
      </div>

      <div className="spacer50px"></div>

      <div className="row justify-content-md-center">
        <ImageTrio
          first="01.jpg"
          second="02.jpg"
          third="03.jpg"
        >
          <div className="spacer25px"></div>
        </ImageTrio>

        <ImageTrio
          first="04.jpg"
          second="05.jpg"
          third="06.jpg"
        >
          <div className="spacer25px"></div>
        </ImageTrio>

        <ImageTrio
          first="07.jpg"
          second="08.jpg"
          third="09.jpg"
        >
          <div className="spacer25px"></div>
        </ImageTrio>

        <ImageTrio
          first="10.jpg"
          second="11.jpg"
          third="12.jpg"
        >
          <div className="spacer25px"></div>
        </ImageTrio>

        <ImageTrio
          first="13.jpg"
          second="14.jpg"
          third="15.jpg"
        />
      </div>

      <Footer />
    </Container>
  );
}
