import { useState } from 'react';
import Modal from 'react-awesome-modal';
import Image from 'next/image';

import style from './PhotoViewer.module.css';
import getProductLink from '../lib/get-product-link';

type TPhotos = {
  photo1: string | null,
  photo2: string | null,
  photo3: string | null,
  photo4: string | null,
  photo5: string | null,
  photo6: string | null,
  photo7: string | null,
  photo8: string | null,
  photo9: string | null,
}

export default function PhotoViewer(props: { photos: TPhotos }) {
  const { photos } = props;

  const [fadeState, setFadeState] = useState(style.fadeIn);
  const [modalState, setModalState] = useState(false);
  const [mainImage, setMainImage] = useState(photos.photo1);
  const [otherImages, setOtherImages] = useState({
    photo2: photos.photo2,
    photo3: photos.photo3,
    photo4: photos.photo4,
  })

  function fadeOut() {
    setFadeState(style.fadeNone);
  }

  function fadeIn() {
    setFadeState(style.fadeIn);
  }

  function toggleModal() {
    setModalState(!modalState);
  }

  function productPhotoHandling(e) {
    const currentId = e.currentTarget.id;
    const currentMainPhoto = mainImage;

    if (currentId === 'photo1') {
      toggleModal();
    } else {
      fadeOut();
      setTimeout(fadeIn, 100);
    }

    if (currentId === 'photo2') {
      setMainImage(otherImages.photo2);
      setOtherImages({
        ...otherImages,
        photo2: currentMainPhoto,
      });
    }

    if (currentId === 'photo3') {
      setMainImage(otherImages.photo3);
      setOtherImages({
        ...otherImages,
        photo3: currentMainPhoto,
      });
    }

    if (currentId === 'photo4') {
      setMainImage(otherImages.photo4);
      setOtherImages({
        ...otherImages,
        photo4: currentMainPhoto,
      });
    }
  }

  function getPhotoUri(fileName: string | null) {
    if (!fileName) return '';

    return getProductLink(fileName);
  }

  return (
    <div className="col-md-6 ce">
      <div className="row">
        <div className="col-md-12" id={fadeState}>
          <Image
            src={getPhotoUri(mainImage)}
            layout="responsive"
            width={500}
            height={500}
            onClick={productPhotoHandling}
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
                src={getPhotoUri(otherImages.photo2)}
                layout="responsive"
                width={150}
                height={150}
                onClick={productPhotoHandling}
                className="pointer"
                id="photo2"
              />
            </div>
            <div className="col-4 ce">
              <Image
                src={getPhotoUri(otherImages.photo3)}
                layout="responsive"
                width={150}
                height={150}
                onClick={productPhotoHandling}
                className="pointer"
                id="photo3"
              />
            </div>
            <div className="col-4 ce">
              <Image
                src={getPhotoUri(otherImages.photo4)}
                layout="responsive"
                width={150}
                height={150}
                onClick={productPhotoHandling}
                className="pointer"
                id="photo4"
              />
            </div>
          </div>
        </div>
      </div>

      <Modal
        visible={modalState}
        effect="fadeInUp"
        onClickAway={toggleModal}
      >
        <div>
          <img
            src={getPhotoUri(mainImage)}
            className={style.maxHeight}
            data-cy="bigPhotoModal"
          />
        </div>
      </Modal>

    </div>
  )
}
