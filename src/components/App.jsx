import { useState } from 'react';
import { nanoid } from 'nanoid';

import css from './App.module.css';
// import items from './items';

import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import ContactForm from './ContactForm/ContactForm';

export const App = () => {
  const [contact, setContact] = useState([]);
  const [filter, setFilter] = useState('');

  const isDublicate = (name, number) => {
    const sameContact = contact.find(contact => {
      return (
        contact.name.toLowerCase() === name.toLowerCase() ||
        contact.number === number
      );
    });
    return Boolean(sameContact);
  };

  const addContacts = ({ name, number }) => {
    if (isDublicate(name, number)) {
      alert(`${name} is already in contacts`);
      return false;
    }
    setContact(prevContact => {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      return [newContact, ...prevContact];
    });
  };

  const handleFilterChange = ({ currentTarget }) =>
    setFilter(currentTarget.value);

  const filterContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    if (!filter) {
      return contact;
    }
    const result = contact.filter(
      ({ name, number }) =>
        name.toLowerCase().includes(normalizedFilter) ||
        number.includes(normalizedFilter)
    );

    return result;
  };

  const deleteContact = id => {
    setContact(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const contacts = filterContacts();
  const isContacts = Boolean(contacts.length);

  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onSubmit={addContacts} isDublicate={isDublicate} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      {isContacts ? (
        <ContactList contacts={contacts} deleteContact={deleteContact} />
      ) : (
        <p>There are no contacts in list</p>
      )}
    </div>
  );
};
