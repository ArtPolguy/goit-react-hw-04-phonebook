import { Component } from 'react';
import { nanoid } from 'nanoid';

import css from './ContactForm.module.css';
import PropTypes from 'prop-types';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    const { onSubmit, isDublicate } = this.props;
    const { name, number } = this.state;

    onSubmit({ ...this.state });
    if (!isDublicate(name, number)) {
      this.setState({
        name: '',
        number: '',
      });
    }
  };

  handleChange = e => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };

  nameInputId = nanoid();
  numberInputId = nanoid();

  render() {
    const { name, number } = this.state;
    return (
      <form className={css.frame} onSubmit={this.handleSubmit}>
        <label htmlFor={this.nameInputId}> Name</label>
        <input
          id={this.nameInputId}
          className={css.input}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={this.handleChange}
        />
        <label htmlFor={this.numberInputId}> Number</label>
        <input
          id={this.numberInputId}
          className={css.input}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={this.handleChange}
        />
        <button className={css.submitBtn} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

export default ContactForm;

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
