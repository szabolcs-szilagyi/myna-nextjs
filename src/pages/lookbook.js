import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Image from 'next/image';

import Cookies from 'universal-cookie';
const cookies = new Cookies();
const hash = cookies.get('hash');

import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Ping from '../components/Ping';
import style from './lookbook.module.css';

import { API_SERVER } from '../constants';

function LookbookImage({ imageSrc, height, width, alt = '', additionalClass = '' }) {
  return (
    <div className={style.imageContainer + ' ' + additionalClass} >
      <a href="/shop-collections">
        <Image
          layout="responsive"
          height={height}
          width={width}
          src={imageSrc}
          alt={alt}
        />
      </a>
    </div>
  );
}

export default class Index extends React.Component {
  render() {
		return (
      <Container fluid>
        <Header />
        <Nav />
        <Ping />
        <div className="spacer50px"></div>
        <div className="row">
          <div className="col-md-12 ce capitalLetters">
            <h2><strong>Lookbook</strong></h2>
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
                    She's matured and grown, this time she reflects a balanced elegance of a different summer glow.
                    She's nurturing and perceptive, but every now and then she shows her romantic and spontanous side.
                  </p>
                </div>
              </div>
              <LookbookImage
                imageSrc="/lookbook/03.jpg"
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
            imageSrc="/lookbook/04.jpg"
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
                  imageSrc="/lookbook/05.jpg"
                  height={1280}
                  width={853}
                />
                <div className="spacer25px d-block d-md-none"></div>
              </div>
              <div className="col-md-6" >
                <LookbookImage
                  imageSrc="/lookbook/06.jpg"
                  height={853}
                  width={1280}
                />
                <div className="spacer25px"></div>
                <LookbookImage
                  imageSrc="/lookbook/07.jpg"
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
            imageSrc="/lookbook/08.jpg"
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
                  imageSrc="/lookbook/09.jpg"
                  height={853}
                  width={1280}
                />
                <div className="spacer25px"></div>
                <LookbookImage
                  imageSrc="/lookbook/10.jpg"
                  height={853}
                  width={1280}
                />
                <div className="spacer25px d-block d-md-none"></div>
              </div>
              <div className="col-md-6 ce">
                <LookbookImage
                  imageSrc="/lookbook/11.jpg"
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
}
