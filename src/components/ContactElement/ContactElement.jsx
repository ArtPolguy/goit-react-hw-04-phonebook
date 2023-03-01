import css from './ContactElement.module.css';
import PropTypes from 'prop-types';

const ContactElement = ({ id, name, number, deleteContact }) => {
  return (
    <li className={css.contactListItem} key={id}>
      <span>{name}: </span>
      <span>{number}</span>
      <button
        className={css.deleteBtn}
        onClick={() => {
          deleteContact(id);
        }}
        type="button"
      >
        Delete
      </button>
    </li>
  );
};
export default ContactElement;

ContactElement.propTypes = {
  id: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onclick: PropTypes.func,
};
