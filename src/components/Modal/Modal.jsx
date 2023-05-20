import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import ModalStyled from './ModalStyled';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  propTypes = {
    image: PropTypes.shape({
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }),
    toggleModal: PropTypes.func.isRequired,
  };

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.toggleModal(null);
    }
  };

  handleClick = e => {
    if (e.target.nodeName !== 'IMG') {
      this.props.toggleModal(null);
    }
  };

  render() {
    const { largeImageURL, tags } = this.props.image;

    return createPortal(
      <ModalStyled onClick={this.handleClick}>
        <div className="modal">
          <img src={largeImageURL} alt={tags} />
        </div>
      </ModalStyled>,
      document.getElementById('modal-root')
    );
  }
}
