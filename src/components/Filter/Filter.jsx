import css from './Filter.module.css';
import PropTypes from 'prop-types';
import { memo } from 'react';

const Filter = ({ filter, handleFilterChange }) => {
  console.log('filter');
  return (
    <>
      <h2>Contacts</h2>
      <label className={css.findNameLabel}>
        Find contacts by name:
        <input
          className={css.inputFilter}
          type="text"
          name="filter"
          value={filter}
          onChange={handleFilterChange}
        />
      </label>
    </>
  );
};

export default memo(Filter);

Filter.propTypes = {
  filter: PropTypes.string,
  handleFilterChange: PropTypes.func.isRequired,
};
