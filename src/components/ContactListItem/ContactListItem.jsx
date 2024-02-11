import React from 'react';
import { useSelector } from 'react-redux';
import ContactsList from '../ContactsList/ContactsList';
import { selectContacts } from '../../redux/selectors';
import { Title, Message, ContactsWrapper } from './ContactListItem.styled';

const Contacts = () => {
  const contacts = useSelector(selectContacts);

  return (
    <>
      <ContactsWrapper>
        <Title>Contacts</Title>
        {contacts.length > 0 ? (
          <ContactsList />
        ) : (
          <Message>Додайте свій перший контакт</Message>
        )}
      </ContactsWrapper>
    </>
  );
};

export default Contacts;