import { useState, useEffect, useCallback } from 'react';
import { nanoid } from 'nanoid';

import css from './App.module.css';

import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import ContactForm from './ContactForm/ContactForm';

export const App = () => {
  const [contact, setContact] = useState(() => {
    const contacts = JSON.parse(localStorage.getItem('saveContacts'));
    return contacts ? contacts : [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('saveContacts', JSON.stringify(contact));
  }, [contact]);

  const isDublicate = useCallback(
    (name, number) => {
      const sameContact = contact.find(contact => {
        return (
          contact.name.toLowerCase() === name.toLowerCase() ||
          contact.number === number
        );
      });
      return Boolean(sameContact);
    },
    [contact]
  );

  const addContacts = useCallback(
    ({ name, number }) => {
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
    },
    [isDublicate]
  );

  const handleFilterChange = useCallback(
    ({ currentTarget }) => setFilter(currentTarget.value),
    []
  );

  const filterContacts = useCallback(() => {
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
  }, [contact, filter]);

  const deleteContact = useCallback(id => {
    setContact(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  }, []);

  const filtredContacts = filterContacts();
  const isContacts = Boolean(filtredContacts.length);

  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onSubmit={addContacts} isDublicate={isDublicate} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      {isContacts ? (
        <ContactList contacts={filtredContacts} deleteContact={deleteContact} />
      ) : (
        <p>There are no contacts in list</p>
      )}
    </div>
  );
};
