import dynamic from 'next/dynamic';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation'

import styles from './Slider.module.css';
import Link from 'next/link';

import slide01 from '../../public/slides/01.jpg';
import slide02 from '../../public/slides/02.jpg';
import slide03 from '../../public/slides/03.jpg';

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

export default function Slider() {
  const { t } = useTranslation('slider');

  const slides = [
    {
      text: 'Modern Day Queen',
      linkText: t('SHOP THE LOOK'),
      linkHref: '/shop-collections',
      imageSrc: slide01.src,
      buttonClass: styles.button,
    },
    {
      text: 'Modern Day Queen',
      linkText: t('LOOKBOOK'),
      linkHref: '/lookbook',
      imageSrc: slide02.src,
      buttonClass: styles.button,
    },
    {
      text: t('Our Story'),
      linkText: t('READ MORE'),
      linkHref: '/our-story',
      imageSrc: slide03.src,
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
          imageSrc,
          buttonClass,
        }, i) => (
          <div key={`slider-${i}`} className={styles.eachSlide}>
            <div className={styles.textcontainer}>
              <Image
                quality={90}
                src={imageSrc}
                layout="fill"
                objectFit="cover"
                objectPosition="left top"
              />
              <h3>{text}</h3>
              <Link href={linkHref}>
                <a data-cy="slide-link-button" className={buttonClass}>{linkText}</a>
              </Link>
              <div className={styles.description}>
                <p>{t('we-design-pieces-to-love')}</p>
              </div>
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
}
