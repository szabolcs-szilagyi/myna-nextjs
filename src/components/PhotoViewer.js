import React from 'react';
import Modal from 'react-awesome-modal';
import Image from 'next/image';

import style from './PhotoViewer.module.css';

export default class PhotoViewer extends React.Component {

  constructor(props) {
    super(props);
    const { photos } = props;

    this.state = {
      fade: style.fadeIn,
      ...photos,
    };

    this.productPhotoHandling = this.productPhotoHandling.bind(this);
    this.fadeOut = this.fadeOut.bind(this);
    this.fadeIn = this.fadeIn.bind(this);
    this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
  }

  fadeOut() {
    this.setState({ fade: style.fadeNone });
  }

  fadeIn() {
    this.setState({ fade: style.fadeIn });
  }

  openModal() {
		this.setState({ visible: true });
	}

	closeModal() {
		this.setState({ visible: false });
	}

  productPhotoHandling(e) {
    const currentId = e.currentTarget.id;
    const currentMainPhoto = this.state.photo1;
    let newMainPhoto;

    if (currentId === 'photo1') {
      this.openModal();
    } else {
      this.fadeOut();
      setTimeout(this.fadeIn, 100);
    }

    if (currentId === 'photo2') {
      newMainPhoto = this.state.photo2;
      this.setState({
        photo1: newMainPhoto,
        photo2: currentMainPhoto,
      });
    }

    if (currentId === 'photo3') {
      newMainPhoto = this.state.photo3;
      this.setState({
        photo1: newMainPhoto,
        photo3: currentMainPhoto,
      });
    }

    if (currentId === 'photo4') {
      newMainPhoto = this.state.photo4;
      this.setState({
        photo1: newMainPhoto,
        photo4: currentMainPhoto,
      });
    }
  }

  getPhotoUri(fileName) {
    if (!fileName) return fileName;

    return '/product_photos/' + fileName;
  }

  render() {
    return (
      <div className="col-md-6 ce">
        <div className="row">
          <div className="col-md-12" id={this.state.fade}>
            <Image
              src={this.getPhotoUri(this.state.photo1)}
              layout="responsive"
              width={500}
              height={500}
              onClick={this.productPhotoHandling}
              className="pointer"
              id="photo1"
            />
          </div>
        </div>
        <div className="spacer50px"></div>
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-4 ce">
                <Image
                  src={this.getPhotoUri(this.state.photo2)}
                  layout="responsive"
                  width={150}
                  height={150}
                  onClick={this.productPhotoHandling}
                  className="pointer"
                  id="photo2"
                />
              </div>
              <div className="col-4 ce">
                <Image
                  src={this.getPhotoUri(this.state.photo3)}
                  layout="responsive"
                  width={150}
                  height={150}
                  onClick={this.productPhotoHandling}
                  className="pointer"
                  id="photo3"
                />
              </div>
              <div className="col-4 ce">
                <Image
                  src={this.getPhotoUri(this.state.photo4)}
                  layout="responsive"
                  width={150}
                  height={150}
                  onClick={this.productPhotoHandling}
                  className="pointer"
                  id="photo4"
                />
              </div>
            </div>
          </div>
        </div>

        <Modal
          visible={this.state.visible}
          effect="fadeInUp"
          onClickAway={this.closeModal}
        >
          <div>
            <img src={this.getPhotoUri(this.state.photo1)} className={style.maxHeight} />
          </div>
        </Modal>

      </div>
    )
  }
}
