import PropTypes from 'prop-types';
import ImageGalleryStyled from './ImageGalleryStyled';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images, toggleModal }) => {
  return (
    <ImageGalleryStyled>
      {images.map(({ id, webformatURL, tags }) => (
        <ImageGalleryItem key={id}>
          <img src={webformatURL} alt={tags} onClick={() => toggleModal(id)} />
        </ImageGalleryItem>
      ))}
    </ImageGalleryStyled>
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
  toggleModal: PropTypes.func.isRequired,
};

export default ImageGallery;
