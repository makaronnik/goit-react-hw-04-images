import { Component } from 'react';
import { createPortal } from 'react-dom';
import toast, { Toaster } from 'react-hot-toast';
import AppStyled from './AppStyled';
import Searchbar from './Searchbar/Searchbar';
import Pixabay from '../api/Pixabay';
import Loader from './Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    total: 0,
    page: 1,
    isLoading: false,
    modalImgId: null,
  };

  componentDidUpdate(_, prevState) {
    if (
      this.state.searchQuery !== '' &&
      (prevState.searchQuery !== this.state.searchQuery ||
        prevState.page !== this.state.page)
    ) {
      this.fetchImages();
    }

    if (
      prevState.images.length !== 0 &&
      this.state.images.length > prevState.images.length
    ) {
      this.scrollDown();
    }
  }

  onSubmit = searchQuery => {
    searchQuery = searchQuery.trim();

    this.setState({ searchQuery, page: 1, images: [], total: 0 });
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  toggleModal = imgId => {
    this.setState({ modalImgId: imgId });
  };

  fetchImages = async () => {
    const api = new Pixabay();
    const { searchQuery, page } = this.state;

    this.setState({ isLoading: true });

    try {
      const response = await api.getImages(searchQuery, page);
      const images = response.data.hits;
      const total = response.data.total;

      if (!images.length) {
        toast.error(
          this.state.images.length ? 'No more images' : 'No images found'
        );

        return;
      }

      if (page === 1) {
        toast.success(`${total} images were found`);
      }

      this.setState(prevState => ({
        images: [
          ...prevState.images,
          ...images.map(({ id, webformatURL, largeImageURL, tags }) => ({
            id,
            webformatURL,
            largeImageURL,
            tags,
          })),
        ],
        total,
      }));
    } catch (error) {
      toast.error(error.message);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  scrollDown = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  render() {
    const { images, isLoading, modalImgId, total } = this.state;

    return (
      <AppStyled>
        <Searchbar onSubmit={this.onSubmit} />
        {images.length > 0 && (
          <ImageGallery images={images} toggleModal={this.toggleModal} />
        )}
        {isLoading && <Loader />}
        {images.length > 0 && !isLoading && images.length < total && (
          <Button onLoadMore={this.onLoadMore} />
        )}
        {modalImgId && (
          <Modal
            image={images.find(image => image.id === modalImgId)}
            toggleModal={() => this.toggleModal(null)}
          />
        )}
        {createPortal(
          <Toaster position="top-right" />,
          document.getElementById('toaster-root')
        )}
      </AppStyled>
    );
  }
}
