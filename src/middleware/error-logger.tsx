import type {Middleware, MiddlewareAPI} from '@reduxjs/toolkit';
import {isRejectedWithValue} from '@reduxjs/toolkit';
import {showNotification} from '@src/components/notification/notification-slice';

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      const message = action.payload as string;
      api.dispatch(showNotification(message));
    }

    return next(action);
  };