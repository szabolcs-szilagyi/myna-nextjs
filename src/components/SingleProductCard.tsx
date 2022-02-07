import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import style from './SingleProductCard.module.css';

type TSingleProductCardProps = {
  children?: ReactNode,
  productName: string,
  className?: string,
  width?: number,
  height?: number,
  price?: string,
  productPageLink: string,
  productImageLink: string,
};

export default function SingleProductCard(props: TSingleProductCardProps) {
  const {
    className = 'col-md-6',
    width = 150,
    height = 150,
  } = props;

  const children = props.children
                || (<p>{props.productName}<br /><span>{props.price}</span></p>);

  return (
    <div data-cy="product-card" className={className}>
      <div className={style.cImage} >
        <Link href={props.productPageLink}><a>
          <Image
            src={props.productImageLink}
            layout="responsive"
            width={width}
            height={height}
            alt={props.productName}
          />
          {children}
        </a></Link>
      </div>
      <div className={style.imageSpacer} />
    </div>
  );
}
