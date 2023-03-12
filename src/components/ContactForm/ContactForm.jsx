import { useState, memo } from 'react';
import { nanoid } from 'nanoid';

import css from './ContactForm.module.css';
import PropTypes from 'prop-types';

const ContactForm = ({ onSubmit, isDublicate }) => {
  console.log('ContactForm');
  const [state, setState] = useState({
    name: '',
    number: '',
  });

  const nameInputId = nanoid();
  const numberInputId = nanoid();

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit({ ...state });

    if (!isDublicate(state.name, state.number)) {
      setState({
        name: '',
        number: '',
      });
    }
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  return (
    <form className={css.frame} onSubmit={handleSubmit}>
      <label htmlFor={nameInputId}> Name</label>
      <input
        id={nameInputId}
        className={css.input}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={state.name}
        onChange={handleChange}
      />
      <label htmlFor={numberInputId}> Number</label>
      <input
        id={numberInputId}
        className={css.input}
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        value={state.number}
        onChange={handleChange}
      />
      <button className={css.submitBtn} type="submit">
        Add contact
      </button>
    </form>
  );
};

export default memo(ContactForm);

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
