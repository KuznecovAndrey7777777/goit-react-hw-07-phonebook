import React, { useEffect } from 'react';
import { WrapperContent } from './App.styled';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import Contacts from './Contacts/ContactListItem';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from '../redux/operations';
import { selectError, selectIsLoading } from '../redux/selectors';

const App = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <WrapperContent>
      <ContactForm />
      <Filter />
      {isLoading && !error && <b>Запит обробляється...</b>}
      <Contacts />
    </WrapperContent>
  );
};

export default App;
