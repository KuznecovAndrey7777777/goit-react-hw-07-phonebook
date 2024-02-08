import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';

const initialContacts = [
    {
        id: nanoid(),
        name: 'Rosie Simpson',
        number: '459-12-56',
    },
    {
        id: nanoid(),
        name: 'Hermione Kline',
        number: '443-89-12',
    },
    {
        id: nanoid(),
        name: 'Eden Clements',
        number: '645-17-79',
    },
    {
        id: nanoid(),
        name: 'Annie Copeland',
        number: '227-91-26',
    },
];

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
        contacts: initialContacts,
    },
    reducers: {
        addContact: {
            reducer(state, action) {
                state.contacts.unshift(action.payload);

                Notiflix.Notify.success(`${action.payload.name} успішно додано до вашого телефонного букваря`);
            },
            prepare(name, number) {
                return {
                    payload: {
                        name,
                        number,
                        id: nanoid(),
                    },
                };
            },
        },

        deleteContact(state, action) {
            state.contacts = state.contacts.filter(
                contact => contact.id !== action.payload
            );
        },
    },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export default contactsSlice.reducer;