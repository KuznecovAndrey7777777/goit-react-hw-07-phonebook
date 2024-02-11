import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Notiflix from 'notiflix';

axios.defaults.baseURL = 'https://65c7b172e7c384aada6ed863.mockapi.io';

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

export const fetchContacts = createAsyncThunk('contacts/fetchAll', async (_, thunkAPI) => {
  try {
    const response = await axios.get('/contacts');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const addContact = createAsyncThunk('contacts/addContacts', async (contact, thunkAPI) => {
  try {
    const response = await axios.post('/contacts', contact);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${contactId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const toggleIsFavourite = createAsyncThunk(
  'contacts/toggleIsFavourite',
  async ({ id, isFavourite }, thunkAPI) => {
    try {
      const response = await axios.put(`/contacts/${id}`, {
        isFavourite: !isFavourite,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    error: null,
    isLoading: false,
    sortedAlphabetic: true,
    recentlyAdded: true,
    favIsShown: false,
  },
  reducers: {
    sortByName(state) {
      state.contacts = state.contacts.sort((firstContact, secondContact) =>
        state.sortedAlphabetic
          ? firstContact.name.localeCompare(secondContact.name)
          : secondContact.name.localeCompare(firstContact.name)
      );
      state.sortedAlphabetic = !state.sortedAlphabetic;
    },
    sortByAdded(state) {
      state.contacts = state.contacts.sort((firstContact, secondContact) =>
        state.recentlyAdded
          ? secondContact.id - firstContact.id
          : firstContact.id - secondContact.id
      );
      state.recentlyAdded = !state.recentlyAdded;
    },
    toggleShowFavourites(state) {
      state.favIsShown = !state.favIsShown;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.unshift(action.payload);
        state.isLoading = false;
        state.error = null;
        Notiflix.Notify.success(
          `${action.payload.name} has been successfully added to your phonebook`
        );
      })
      .addCase(addContact.rejected, handleRejected)
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.contacts = state.contacts.filter(
          (contact) => contact.id !== action.payload.id
        );
      })
      .addCase(deleteContact.rejected, handleRejected)
      .addCase(toggleIsFavourite.pending, handlePending)
      .addCase(toggleIsFavourite.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.contacts.findIndex(
          (contact) => contact.id === action.payload.id
        );
        state.contacts[index] = action.payload;
      })
      .addCase(toggleIsFavourite.rejected, handleRejected);
  },
});

export default contactsSlice.reducer;
export const { sortByName, sortByAdded, toggleShowFavourites } = contactsSlice.actions;
