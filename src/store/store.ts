import { configureStore } from '@reduxjs/toolkit';
import issuesSlice from '@src/modules/issues/slice/issues-slice';
import { rtkQueryErrorLogger } from '../middleware/error-logger';

const store = configureStore({
  reducer: {
    issues: issuesSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rtkQueryErrorLogger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;