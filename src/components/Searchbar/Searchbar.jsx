import PropTypes from 'prop-types';
import SearchbarStyled from './SearchbarStyled';

const Searchbar = ({ onSubmit }) => {
  const handleFormSubmit = event => {
    event.preventDefault();

    const form = event.currentTarget;
    const searchQuery = form.elements.query.value;

    onSubmit(searchQuery);
  };

  return (
    <SearchbarStyled>
      <form onSubmit={handleFormSubmit}>
        <button type="submit">
          <span className="button-label">Search</span>
        </button>

        <input
          name="query"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </SearchbarStyled>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
