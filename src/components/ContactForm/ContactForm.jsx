import React from 'react';
import { Input, AddButton, Form, Title } from './ContactForm.styled';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contactsSlice';
import Notiflix from 'notiflix';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts);

  const handleSubmit = e => {
    e.preventDefault();

    const { name, number } = e.target;

    const isDuplicate = contacts.some(
      existingContact => existingContact.name === name.value
    );

    if (isDuplicate) {
      Notiflix.Notify.failure(`${name.value} вже є у ваших контактах`);
    } else {
      dispatch(addContact(name.value, number.value));
      Notiflix.Notify.success(
        `${name.value} успішно додано до вашої телефоної книги`
      );
    }

    e.target.reset();
  };

  return (
    <>
      <Title>Phonebook</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Назва може містити лише літери, апостроф, тире та пробіли. Наприклад, Адріан, Джейкоб Мерсер, Шарль де Бац де Кастельмор д'Артаньян"
          required
          placeholder="Name"
        />
        <Input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефону має складатися з цифр і може містити пробіли, тире, круглі дужки та починатися з +"
          required
          placeholder="Number"
        />
        <AddButton type="submit">Add contacts</AddButton>
      </Form>
    </>
  );
};

export default ContactForm;