import React from 'react';
import Image from 'next/image';

import style from './SingleProductCard.module.css';

export default function SingleProductCard(props) {
  return (
    <div className="col-md-6">
      <div className={style.cImage} >
        <a href={props.productPageLink}>
          <Image
            src={props.productImageLink}
            layout="responsive"
            width={150}
            height={150}
            alt={props.productName}
          />
          <p>{props.productName}<br /><span>{props.price}</span></p>
        </a>
      </div>
      <div className="spacer25px" />
    </div>
  );
}
