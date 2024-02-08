import {
  ContactsList,
  ListItem,
  DeleteBtn,
  Title,
  Message,
} from './ContactList.styled.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsSlice';
import { getContacts, getFilter } from '../../redux/selectors';

const getVisibleContacts = (contacts, filterValue) => {
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filterValue.toLowerCase())
  );
  return filteredContacts;
};

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const visibleContacts = getVisibleContacts(contacts, filter);

  return (
    <>
      <Title>Contacts</Title>

      {contacts.length > 0 ? (
        <ContactsList>
          {visibleContacts.map(({ name, number, id }) => (
            <ListItem key={id}>
              <p>
                {name}: {number}
              </p>
              <DeleteBtn
                onClick={() => dispatch(deleteContact(id))}
                type="button"
              >
                Remove
              </DeleteBtn>
            </ListItem>
          ))}
        </ContactsList>
      ) : (
        <Message>Add your first contact</Message>
      )}
    </>
  );
};

export default ContactList;
