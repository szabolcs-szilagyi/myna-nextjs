import Container from 'react-bootstrap/Container';
import Link from 'next/link';
import Image from 'next/image';

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
import img08 from '../../public/lookbook/08.jpg';
import img09 from '../../public/lookbook/09.jpg';
import img10 from '../../public/lookbook/10.jpg';
import img11 from '../../public/lookbook/11.jpg';

type LookbookImageProps = {
  imageSrc: string;
  height: number;
  width: number;
  alt?: string;
  additionalClass?: string;
};

function LookbookImage({
  imageSrc,
  height,
  width,
  alt = '',
  additionalClass = '',
}: LookbookImageProps) {
  return (
    <div className={style.imageContainer + ' ' + additionalClass}>
      <Link href="/shop-collections">
        <a>
          <Image
            layout="responsive"
            height={height}
            width={width}
            src={imageSrc}
            alt={alt}
          />
        </a>
      </Link>
    </div>
  );
}

export default function Lookbook() {
  usePing();

  return (
    <Container fluid>
      <Header description="lookbook" />
      <Nav />
      <div className="spacer50px"></div>
      <div className="row">
        <div className="col-md-12 ce capitalLetters">
          <h1>
            <strong>Lookbook</strong>
          </h1>
        </div>
      </div>
      <div className="spacer50px"></div>

      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="row">
            <div className="col-md-6 ce">
              <LookbookImage
                imageSrc={img01.src}
                height={img01.height}
                width={img01.width}
                additionalClass="col-md-12 px-0"
              />
            </div>
            <div className="spacer25px d-block d-md-none"></div>
            <div className="col-md-6 ce">
              <LookbookImage
                imageSrc={img02.src}
                height={img02.height}
                width={img02.width}
              />
              <div className="spacer25px"></div>
              <LookbookImage
                imageSrc={img03.src}
                height={img03.height}
                width={img03.width}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="spacer25px"></div>

      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="row">
            <div className="col-md-12">
              <LookbookImage
                imageSrc={img04.src}
                height={img04.height}
                width={img04.width}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="spacer25px"></div>

      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="row">
            <div className="col-md-6">
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
            <div className="spacer25px d-block d-md-none"></div>
            <LookbookImage
              imageSrc={img07.src}
              height={img07.height}
              width={img07.width}
              additionalClass="col-md-6"
            />
          </div>
        </div>
      </div>
      <div className="spacer25px"></div>

      <div className="row">
        <div className="col-md-8 mx-auto">
          <LookbookImage
            imageSrc={img08.src}
            height={img08.height}
            width={img08.width}
          />
        </div>
      </div>
      <div className="spacer25px"></div>

      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="row">
            <div className="col-md-6 ce">
              <LookbookImage
                imageSrc={img09.src}
                height={img09.height}
                width={img09.width}
                additionalClass="col-md-12 px-0"
              />
            </div>
            <div className="spacer25px d-block d-md-none"></div>
            <div className="col-md-6 ce">
              <LookbookImage
                imageSrc={img10.src}
                height={img10.height}
                width={img10.width}
              />
              <div className="spacer25px"></div>
              <LookbookImage
                imageSrc={img11.src}
                height={img11.height}
                width={img11.width}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </Container>
  );
}
