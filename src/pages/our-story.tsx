import React from 'react';
import Image from 'next/image';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Ping from '../components/Ping';
import Container from 'react-bootstrap/Container';

export default class Index extends React.Component {
  render() {
		return (
			<Container fluid>
      <Header />
        <Nav />
        <Ping />
        <div className="spacer50px" />
        <div className="row">
          <div className="col-md-2" />
          <div className="col-md-8">
            <h1 className="text-center mt-5 mb-3">OUR MISSION</h1>
            <p>We are more than just ethical and sustainable brand</p>
            <p>We create feminine and effortless design</p>
            <p>We design pieces to love forever, create and promote timeless fashion</p>
            <p>We are conscious label</p>
            <p>We promote authentic connection</p>
            <p>We design pieces that are beautiful and inspired by natural beauty, can be versatile and worn for any occasion</p>
            <p>We design long lasting and quality designs and products</p>
            <p>We are not setting new, but long lasting trends</p>
            <p>We create so you can feel amazing, beautiful and have free conscious</p>
            <p>We give you attention to details and personal attention</p>
            <p>We aim to inspire your life!</p>
            <p>We use eco-friendly fabrics that have minimal environmental impacts such as tencel, organic cotton, and linen. The versatility of our pieces allow for prolonged use and all of our packaging, stationery, and marketing materials are printed on recycled paper. We hand-make every piece from start to finish in Poland.</p>

            <h1 className="text-center mt-5 mb-3">OUR VALUES</h1>
            <p><i>Body Positivity</i>{' '}| We bring a trusted and beautiful product that compliments her life and her natural beauty.</p>
            <p><i>Positive Impact</i>{' '}| we are dreamers and believers. By working with ethical and sustainable products, we promote such producers in hope it will increase demand for ethical and sustainable fashion.</p>
            <p><i>Humanity</i>{' '}| We are not willing to compromise people for things. We're an ethically made brand without sweatshop labor, and treat our team as equal partners and collaborators.</p>
            <p><i>Environment</i>{' '}| We promote slow fashion movement, to contribute towards reduction of fashion waste.</p>

            <h1 className="text-center mt-5 mb-3">OUR VISION</h1>
            <p>Our vision is a world dedicated to feminine spirit, celebrating woman through timeless design and love of hidden details, like secrets only she knows.</p>
            <p>We would like our brand to be classic and beautiful, subtle and feminine to reflect our brand and our designs. We want our customer to feel personal connection with the brand, feel unique and cared for, feel beautiful, feel she deserves to look beautiful and can do so effortlessly, at the same she knows she is making the right choice for herself, her loved ones and our beautiful planet. By making conscious choice of purchasing our pieces she looks beautiful, but she does not compromise her values.</p>

            <h1 className="text-center mt-5 mb-3">OUR STORY</h1>
            <p>Fashion was always deep in my heart and evolved to the moment when I didn't wanted to participate anymore in the fast fashion trend. From a very young age, I loved beauty. But I don't want to leave a negative impact on the world. I want to transform the fashion world.</p>
            <p>That's how Myna came about. I was introduced to sustainable fashion by my very old friend who started Mynalabel together with me. The idea was to create label which care about environment and preserves the world for our children. Since than I want to wear clothes that are made by honest wage earners, not transported halfway across the world. I have own vision in style, which I couldn’t find elsewhere. I was searching for feminine forms inspired by romantic&timeless designs, which I will love for years.</p>
            <p>Thanks to Myna, I have fulfilled my dream that started when I was a little girl learning sewing from my mother. The day I graduated from the London College of Fashion, I knew this was not the end of fulfilling my dreams. Once I had saved up enough money, and my kids had grown up a bit, I could finally realize my dream of creating an ethical and Eco-friendly clothing brand.</p>
            <p>We love timeless fashion and living in harmony with nature. My mother is my biggest fan and we inspire each other's creativity. I hope my fashion can inspire you too.</p>

            <div className="spacer25px" />

            <div className="row">
              <div className="col-md-4">
                <Image
                  src="/our-story-01.jpg"
                  layout="responsive"
                  width={200}
                  height={200}
                  alt="Designer"
                />
              </div>
              <div className="col-md-4">
                <Image
                  src="/our-story-02.jpg"
                  layout="responsive"
                  width={200}
                  height={200}
                  alt="Inspiration"
                />
              </div>
              <div className="col-md-4">
                <Image
                  src="/our-story-03.jpg"
                  layout="responsive"
                  width={200}
                  height={200}
                  alt="Nature as muse"
                />
              </div>
            </div>
          </div>
          <div className="col-md-2" />
        </div>
        <div className="spacer50px" />
        <Footer />
      </Container>
		);
	}
}
