// src/redux/notificationsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5');
    return response.data;
  }
);

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    items: [] as any[],
    status: 'idle' as string,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Ocurrió un error desconocido';
      });
  },
});

export default notificationsSlice.reducer;