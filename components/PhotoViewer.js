import React from 'react';
import Modal from 'react-awesome-modal';

export default class PhotoViewer extends React.Component {

  static aspectStyle = {
    '--aspect-ratio': 1,
  }

  constructor(props) {
    super(props);

    this.state = {
      fade: 'fadeIn',
      ...props.photos,
    };

    this.productPhotoHandling = this.productPhotoHandling.bind(this);
    this.fadeOut = this.fadeOut.bind(this);
    this.fadeIn = this.fadeIn.bind(this);
    this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...nextProps.photos });
  }

  fadeOut () {
    this.setState({ fade: 'fadeNone' });
  }

  fadeIn () {
    this.setState({ fade: 'fadeIn' });
  }

  openModal() {
		this.setState({ visible: true });
	}

	closeModal() {
		this.setState({ visible: false });
	}

  productPhotoHandling(e) {
    let currentId = e.currentTarget.id;
    let tmp1 = this.state.photo1;
    let tmp2;
    if (currentId == 'photo1') {
      this.openModal();
    } else {
      this.fadeOut();
      setTimeout(this.fadeIn, 100);
    }

    if (currentId == 'photo2') {
      tmp2 = this.state.photo2;
      this.setState({
        photo1: tmp2,
        photo2: tmp1,
      });
    }

    if (currentId == 'photo3') {
      tmp2 = this.state.photo3;
      this.setState({
        photo1: tmp2,
        photo3: tmp1,
      });
    }

    if (currentId == 'photo4') {
      tmp2 = this.state.photo4;
      this.setState({
        photo1: tmp2,
        photo4: tmp1,
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
            <div style={PhotoViewer.aspectStyle}>
              <img
                src={this.getPhotoUri(this.state.photo1)}
                onClick={this.productPhotoHandling}
                className="pointer bigProductPhoto dyn"
                id="photo1"
              />
            </div>
          </div>
        </div>
        <div className="spacer50px"></div>
        <div className="row">
          <div className="col-md-12">
            <div className="marginAuto">
              <div className="row">
                <div className="col-4 ce">
                  <div style={PhotoViewer.aspectStyle}>
                    <img
                      src={this.getPhotoUri(this.state.photo2)}
                      onClick={this.productPhotoHandling}
                      className="pointer smallProductPhoto dyn"
                      id="photo2"
                    />
                  </div>
                </div>
                <div className="col-4 ce">
                  <div style={PhotoViewer.aspectStyle}>
                    <img
                      src={this.getPhotoUri(this.state.photo3)}
                      onClick={this.productPhotoHandling}
                      className="pointer smallProductPhoto dyn"
                      id="photo3"
                    />
                  </div>
                </div>
                <div className="col-4 ce">
                  <div style={PhotoViewer.aspectStyle}>
                    <img
                      src={this.getPhotoUri(this.state.photo4)}
                      onClick={this.productPhotoHandling}
                      className="pointer smallProductPhoto dyn"
                      id="photo4"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal
          visible={this.state.visible}
          effect="fadeInUp"
          onClickAway={() => this.closeModal()}
        >
          <div>
            <img src={this.getPhotoUri(this.state.photo1)} className="dyn maxHeight" />
          </div>
        </Modal>

      </div>
    )
  }
}
