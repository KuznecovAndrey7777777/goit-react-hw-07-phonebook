import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Notiflix from 'notiflix';
import { addContact } from '../../redux/operations';
import { selectContacts } from '../../redux/selectors';
import { Title, Form, Input, AddButton } from './ContactForm.styled';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleSubmit = async e => {
    e.preventDefault();
    const { name, phone } = e.target;
    const contact = { name: name.value, phone: phone.value };

    if (contacts.find(existingContact => existingContact.name === name.value)) {
      Notiflix.Notify.failure(`${contact.name} вже у ваших контактах`);
    } else {
      try {
        await dispatch(addContact(contact));
        Notiflix.Notify.success(
          `${contact.name} успішно додано до вашої телефонної книги`
        );
      } catch (error) {
        // обробка помилок
      }
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
          title="Назва може містити лише літери, апостроф, тире та пробіли. Наприклад Адріан, Джейкоб Мерсер, Шарль де Бац де Кастельмор д'Артань"
          required
          placeholder="Name"
        />
        <Input
          type="tel"
          name="phone"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефону має складатися з цифр і може містити пробіли, тире, круглі дужки та починатися з +"
          required
          placeholder="Number"
        />
        <AddButton type="submit">
          <span>Add contacts</span>
        </AddButton>
      </Form>
    </>
  );
};

export default ContactForm;
