import PropTypes from 'prop-types';
import ImageGalleryItemStyled from './ImageGalleryItemStyled';

const ImageGalleryItem = ({ children }) => {
  return <ImageGalleryItemStyled>{children}</ImageGalleryItemStyled>;
};

ImageGalleryItem.propTypes = {
  children: PropTypes.node,
};

export default ImageGalleryItem;
