import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../../redux/operation';
import {
  selectVisibleContacts,
  selectFavourites,
  selectFavIsShown,
} from '../../redux/selectors';
import { List, ListItem, DeleteBtn, BtnWrapper } from './ContactsList.styled';

const ContactsList = () => {
  const visibleContacts = useSelector(selectVisibleContacts);
  const favContacts = useSelector(selectFavourites);
  const favIsShown = useSelector(selectFavIsShown);
  const dispatch = useDispatch();
  const contactsToShow = favIsShown ? favContacts : visibleContacts;

  return (
    <>
      <List>
        {contactsToShow.map(({ name, phone, id, isFavourite }) => (
          <ListItem key={id}>
            {name}: {phone}
            <BtnWrapper>
              <DeleteBtn
                type="button"
                onClick={() => dispatch(deleteContact(id))}
              >
                Delete
              </DeleteBtn>
            </BtnWrapper>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default ContactsList;
