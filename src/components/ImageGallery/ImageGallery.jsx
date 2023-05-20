import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import ImageGalleryStyled from './ImageGalleryStyled';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images }) => {
  const [modalImg, setModalImg] = useState(null);

  return (
    <>
      <ImageGalleryStyled>
        {images.map(image => (
          <ImageGalleryItem key={image.id}>
            <img
              src={image.webformatURL}
              alt={image.tags}
              onClick={() => setModalImg(image)}
            />
          </ImageGalleryItem>
        ))}
      </ImageGalleryStyled>
      {modalImg && (
        <Modal image={modalImg} toggleModal={() => setModalImg(null)} />
      )}
    </>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};

export default ImageGallery;
