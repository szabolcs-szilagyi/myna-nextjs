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

import { API_SERVER } from '../src/constants';

function LookbookImage({ imageSrc, height, width, alt = '' }) {
  return (
    <div className={style.imageContainer} >
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
                <div className={style.lbtxtContainer}>
                  <div className={style.lbtxt}>
                    She's matured and grown, this time she reflects a balanced elegance of a different summer glow.
                    She's nurturing and perceptive, but every now and then she shows her romantic and spontanous side.
                  </div>
                </div>
              </div>
              <div className="col-md-4 ce">
                <LookbookImage
                  imageSrc="/lookbook/01.jpg"
                  height={853}
                  width={1280}
                />
                <div className="spacer25px"></div>
              </div>
              <div className="col-md-1 ce"></div>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>

        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-6 ce">
                <LookbookImage
                  imageSrc="/lookbook/02.jpg"
                  height={853}
                  width={1280}
                />
                <div className="spacer25px"></div>
              </div>
              <div className="col-md-6 ce">
                <LookbookImage
                  imageSrc="/lookbook/03.jpg"
                  height={1280}
                  width={853}
                />
                <div className="spacer25px"></div>
              </div>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-8 ce">
                <LookbookImage
                  imageSrc="/lookbook/04.jpg"
                  height={1280}
                  width={1280}
                />
                <div className="spacer25px"></div>
              </div>
              <div className="col-md-1"></div>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>

        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-8 ce">
                <LookbookImage
                  imageSrc="/lookbook/05.jpg"
                  height={853}
                  width={1280}
                />
                <div className="spacer25px"></div>
              </div>
              <div className="col-md-4 ce">
                <LookbookImage
                  imageSrc="/lookbook/06.jpg"
                  height={853}
                  width={1280}
                />
                <div className="spacer25px"></div>
              </div>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>

        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-2"></div>
              <div className="col-md-8 ce">
                <LookbookImage
                  imageSrc="/lookbook/07.jpg"
                  height={853}
                  width={1280}
                />
                <div className="spacer25px"></div>
              </div>
              <div className="col-md-2"></div>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>

        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-6 ce">
                <LookbookImage
                  imageSrc="/lookbook/08.jpg"
                  height={853}
                  width={1280}
                />
                <div className="spacer25px"></div>
              </div>
              <div className="col-md-6 ce"></div>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>

        <Footer />
      </Container>
		);
	}
}
