
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotificationState {
  open: boolean;
  message: string;
}

const initialState: NotificationState = {
  open: false,
  message: '',
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    showNotification(state, action: PayloadAction<string>) {
      state.open = true;
      state.message = action.payload;
    },
    hideNotification(state) {
      state.open = false;
      state.message = '';
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;