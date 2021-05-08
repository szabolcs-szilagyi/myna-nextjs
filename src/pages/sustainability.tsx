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
        <div className="spacer50px"></div>
        <div className="row">
          <div className="col-md-12 ce capitalLetters">
            <h2><strong>Sustainability</strong></h2>
          </div>
        </div>
        <div className="spacer50px"></div>
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="spacer25px"></div>
            <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-8">
                <p className="capitalLetters"><strong>Who made your clothes</strong></p>
                <p className="ju">All our pieces are hand-crafted by our family members in Poland. They take care of all the sewing, cutting and sizing. All items are made with special care and with dedication of our Executive Seamstresses. Together with Justyna, they thoroughly check every piece before it makes its way to you. Our goal is that every piece is loved and worn for years, thus we make every piece with commitment to quality.</p>
              </div>
            </div>
            <div className="spacer50px"></div>
            <div className="row">
              <div className="col-md-8">
                <p className="capitalLetters"><strong>Timeless pieces</strong></p>
                <p className="ju">We give you small capsule collections that are timeless and work together over the seasons. We believe in creating items that you will love for years, pieces that are unique but versatile, they can be worn together to create whole outfit, and you can easily transform from special occasion to casual look.</p>
                <p className="ju">Our pieces are destined to complement your life, your lifestyle and your body. They are made by women and for women, we created each piece for our friends, families and ourselves. We live and breathe our creations and we are proud to share them with you.</p>
              </div>
              <div className="col-md-4"></div>
            </div>
            <div className="spacer50px"></div>
            <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-8">
                <p className="capitalLetters"><strong>Ethically sourced</strong></p>
                <p className="ju">We believe in transparency. We work with people and companies that are dedicated to ethical and sustainable sourcing and production. We rely on certification for sustainable and where possible organic fabrics. All fabrics are dyed naturally and without harm to the environment. We seek to build close relationships with our suppliers to ensure best quality without compromising impact on environment and communities. Every item consists description of textiles and their origins. Ask us anything, we are happy to share everything.</p>
              </div>
            </div>
            <div className="spacer50px"></div>
            <div className="row">
              <div className="col-md-8">
                <p className="capitalLetters"><strong>Our suppliers</strong></p>
                <p className="ju">
                  <strong>Samatoa</strong> - Cambodian based social textile enterprise focusing on the values of fair trade and sustainability. They produce unique and innovative fabric blends with lotus flower. Plus they provide long-lasting and fair employment to over 500 local women. <br />
                  <strong>Siebenblau</strong> - Germany based natural organic cotton and linen fabric distributor, providing mostly biodegradable products. <br />
                  <strong>Fabric House SRL</strong> - Italy based distributor of tencel, modal and cupro textiles, selling innovative, sustainable textiles using closed loop technology and limited resources.
                </p>
              </div>
              <div className="col-md-4"></div>
            </div>
            <div className="spacer50px"></div>
            <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-8">
                <p className="capitalLetters"><strong>Packaging and shipping</strong></p>
                <p className="ju">We exclusively use recyclable and biodegradable stationary and packaging. Our pieces are packaged in linen bags, which can be reused for storaged in your home. We work with Carbonfund.org to make our shipping carbon-neutral. Carbonfund help us to calculate our shipping related emissions, and we offset these by donating to their environmental preservation programmes.</p>
              </div>
            </div>

          </div>
          <div className="col-md-2"></div>
        </div>
        <div className="spacer50px"></div>
        <Footer />
      </Container>
    );
  }
}
