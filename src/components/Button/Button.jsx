import PropTypes from 'prop-types';
import ButtonStyled from './ButtonStyled';

const Button = ({ onLoadMore }) => {
  return (
    <ButtonStyled>
      <button type="button" onClick={onLoadMore}>
        Load more
      </button>
    </ButtonStyled>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};

export default Button;
