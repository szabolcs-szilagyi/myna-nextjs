import dynamic from 'next/dynamic';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation'

import styles from './Slider.module.css';

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
    }
  ];

  return (
    <div className={styles.slideContainer}>
      <Slide {...properties}>
        {slides.map(({ text, linkText, linkHref, imageSrc, buttonClass }, i) => (
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
              <a href={linkHref} className={buttonClass}>{linkText}</a>
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
