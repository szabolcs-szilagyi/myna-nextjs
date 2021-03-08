import React from 'react';

export default class SingleProductCard extends React.Component {
  squareStyle = {
    '--aspect-ratio': '1',
    overflow: 'hidden', // TODO: should not be needed! images need to be square!
  }

  constructor(props) {
    super(props);

    this.hoverPhotoIn = this.hoverPhotoIn.bind(this);
    this.hoverPhotoOut = this.hoverPhotoOut.bind(this);
  }

  hoverPhotoIn (e) {
    e.currentTarget.classList.add('cImageHovered');
  }

  hoverPhotoOut (e) {
    e.currentTarget.classList.remove('cImageHovered');
  }

  render() {
    const props = this.props;

    return (
      <div className="col-md-6 ce">
        <div
          className="cImage"
          onMouseOver={this.hoverPhotoIn}
          onMouseOut={this.hoverPhotoOut}
          style={this.squareStyle}
        >
          <a href={props.productPageLink}>
            <img
              className="dyn"
              src={props.productImageLink}
              alt={props.productName}
            />
            <p>{props.productName}<br /><span>{props.price}</span></p>
          </a>
        </div>
        <div className="spacer25px" />
      </div>
    );
  }
}
