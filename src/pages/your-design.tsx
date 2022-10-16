import Container from 'react-bootstrap/Container';
import Image from 'next/image';

import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import style from './lookbook.module.css';
import generalStyle from './index.module.css';

import img01 from '../../public/pages/your-design/20211106_093509.jpg';

export default function Lookbook() {
  return (
    <Container fluid>
      <Header description="lookbook" />
      <Nav />
      <div className="spacer50px"></div>
      <div className="row">
        <div className="col-md-12 ce capitalLetters">
          <h1>
            <strong>Create Your Own Dream Dress Together With Designer Of MYNALABEL</strong>
          </h1>
        </div>
      </div>
      <div className="spacer50px"></div>


      <div className="col-md-8 mx-auto text-center">
        <p className={generalStyle.inspirationalText}>Your dream is our dream</p>
        <p>
          Have you ever dreamed of having and wearing dress of your imagination?
          How many times you thought of a dress that you couldn’t find other than
          your dreams? Experience the magic of designing your own clothes with
          Mynalabel. Meet our designer, Justyna, who will put your imagination
          and will help you to full fill your ideas into reality. She will create
          a dress that so far was not available to you. Starting from
          inspiration, drawing, finding the write material and lead toward the
          finished dream of yours. The only thing you need to do is to book an
          appointment with the designer and brief her with your ideas and
          purpose.
        </p>
        <p>
          We can make your dream come true so you can enjoy your own and unique
          design. Write to us with short description and we will get back to you.
          <br />
          (Applicable only in Hungary)
        </p>
        <a
          className="blackFont"
          href="mailto:connect@mynalabel.com?subject=My design&body=Dear Justyna,"
        >
          <button className="startshoppingButton">
            BOOK AN APPOINTMENT WITH JUSTYNA
          </button>
        </a>
      </div>
      <div className="spacer25px"></div>
      <div className="row">
        <div className={style.imageContainer + ' col-md-6 mx-auto'}>
          <Image
            layout="responsive"
            height={img01.height}
            width={img01.width}
            src={img01.src}
            alt="Your personal designer"
          />
        </div>
        <div className="spacer25px d-block d-md-none"></div>
      </div>

      <Footer />
    </Container>
  );
}
