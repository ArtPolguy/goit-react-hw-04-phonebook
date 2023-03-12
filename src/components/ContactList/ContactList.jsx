import css from './ContactList.module.css';
import PropTypes from 'prop-types';
import { memo } from 'react';

import ContactElement from '../ContactElement/ContactElement';

const ContactList = ({ contacts, deleteContact }) => {
  console.log('ContactList');
  return (
    <ul className={css.contactList}>
      {contacts.map(({ id, name, number }) => (
        <ContactElement
          key={id}
          id={id}
          name={name}
          number={number}
          deleteContact={deleteContact}
        />
      ))}
    </ul>
  );
};
export default memo(ContactList);

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      number: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  deleteContact: PropTypes.func,
};
