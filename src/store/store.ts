import { configureStore } from '@reduxjs/toolkit';
import issuesSlice from '@src/modules/issues/slice/issues-slice';
import { rtkQueryErrorLogger } from '../middleware/error-logger';
import notificationSlice from '@src/components/notification/notification-slice';
import statisticsSlice from '@src/modules/statistics/slice/statistics-slice';

const store = configureStore({
  reducer: {
    issues: issuesSlice,
    statistics: statisticsSlice,
    notification: notificationSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rtkQueryErrorLogger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;