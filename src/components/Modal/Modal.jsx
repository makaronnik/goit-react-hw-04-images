import { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import ModalStyled from './ModalStyled';

const Modal = ({ image: { largeImageURL, tags }, toggleModal }) => {
  const handleKeyDown = useCallback(
    e => {
      if (e.code === 'Escape') {
        toggleModal(null);
      }
    },
    [toggleModal]
  );

  const handleClick = useCallback(
    e => {
      if (e.target.nodeName !== 'IMG') {
        toggleModal(null);
      }
    },
    [toggleModal]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return createPortal(
    <ModalStyled onClick={handleClick}>
      <div className="modal">
        <img src={largeImageURL} alt={tags} />
      </div>
    </ModalStyled>,
    document.getElementById('modal-root')
  );
};

Modal.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
  toggleModal: PropTypes.func.isRequired,
};

export default Modal;
