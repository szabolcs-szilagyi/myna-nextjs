import dynamic from 'next/dynamic';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation'

import styles from './Slider.module.css';
import Link from 'next/link';

const Slide = dynamic(() =>
  import('react-slideshow-image').then((slideshow) => slideshow.Slide),
  { ssr: false }
);

const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
  pauseOnHover: true,
};

function ImageElement({
  imageSrc,
  imageHref,
}) {
  if(imageHref) {
    return (
      <Link href={imageHref}>
        <a>
          <Image
            quality={90}
            src={imageSrc}
            layout="fill"
            objectFit="cover"
            objectPosition="left top"
          />
        </a>
      </Link>
    );
  } else {
    return (
      <Image
        quality={90}
        src={imageSrc}
        layout="fill"
        objectFit="cover"
        objectPosition="left top"
      />
    );
  }
}

export default function Slider() {
  const { t } = useTranslation('slider');

  const slides = [
    {
      text: '',
      linkText: '',
      linkHref: '/shop-collections',
      imageHref: '/shop-collections',
      imageSrc: '/slides/04.jpg',
      paragraphClass: 'd-none',
      buttonClass: 'd-none',
    },
    {
      text: 'Consciously Beautiful',
      linkText: t('SHOP THE LOOK'),
      linkHref: '/shop-collections',
      imageSrc: '/slides/01.jpg',
      buttonClass: styles.button,
    },
    {
      text: 'Consciously Beautiful',
      linkText: t('LOOKBOOK'),
      linkHref: '/lookbook',
      imageSrc: '/slides/02.jpg',
      buttonClass: styles.button,
    },
    {
      text: t('Our Story'),
      linkText: t('READ MORE'),
      linkHref: '/our-story',
      imageSrc: '/slides/03.jpg',
      buttonClass: styles.button2,
    },
  ];

  return (
    <div className={styles.slideContainer}>
      <Slide {...properties}>
        {slides.map(({
          text,
          linkText,
          linkHref,
          imageHref,
          imageSrc,
          buttonClass,
          paragraphClass = styles.description,
        }, i) => (
          <div key={`slider-${i}`} className={styles.eachSlide}>
            <div className={styles.textcontainer}>
              <ImageElement imageSrc={imageSrc} imageHref={imageHref} />
              <h3>{text}</h3>
              <Link href={linkHref}>
                <a className={buttonClass}>{linkText}</a>
              </Link>
              <div className={paragraphClass}>
                <p>{t('we-design-pieces-to-love')}</p>
              </div>
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
}
