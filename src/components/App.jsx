import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import toast, { Toaster } from 'react-hot-toast';
import AppStyled from './AppStyled';
import Searchbar from './Searchbar/Searchbar';
import Pixabay from '../api/Pixabay';
import Loader from './Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }

    const fetchImages = async () => {
      const api = new Pixabay();

      setIsLoading(true);

      try {
        const response = await api.getImages(searchQuery, page);
        const newImages = response.data.hits;
        const newTotal = response.data.total;

        if (!newImages.length) {
          toast.error(page === 1 ? 'No images found' : 'No more images');

          return;
        }

        if (page === 1) {
          toast.success(`${newTotal} images were found`);
        }

        setImages(prevState => [
          ...prevState,
          ...newImages.map(({ id, webformatURL, largeImageURL, tags }) => ({
            id,
            webformatURL,
            largeImageURL,
            tags,
          })),
        ]);

        setTotal(newTotal);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [searchQuery, page]);

  useEffect(() => {
    if (images.length === 0) {
      return;
    }

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }, [images]);

  const onSubmit = newSearchQuery => {
    if (searchQuery === newSearchQuery.trim()) {
      return;
    }

    setSearchQuery(newSearchQuery.trim());
    setPage(1);
    setImages([]);
    setTotal(0);
  };

  return (
    <AppStyled>
      <Searchbar onSubmit={onSubmit} />
      {images.length > 0 && <ImageGallery images={images} />}
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && images.length < total && (
        <Button onLoadMore={() => setPage(prevState => prevState + 1)} />
      )}
      {createPortal(
        <Toaster position="top-right" />,
        document.getElementById('toaster-root')
      )}
    </AppStyled>
  );
};

export default App;
