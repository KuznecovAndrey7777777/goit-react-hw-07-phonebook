import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../../redux/operations';
import { selectVisibleContacts } from '../../redux/selectors';
import { List, ListItem, DeleteBtn } from './ContactsList.styled';

const ContactsList = () => {
  const visibleContacts = useSelector(selectVisibleContacts);
  const dispatch = useDispatch();

  return (
    <>
      <List>
        {visibleContacts.map(({ name, phone, id }) => (
          <ListItem key={id}>
            {name}: {phone}
            <DeleteBtn
              type="button"
              onClick={() => dispatch(deleteContact(id))}
            >
              Delete
            </DeleteBtn>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default ContactsList;