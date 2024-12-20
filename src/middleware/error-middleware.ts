import {Middleware} from 'redux';
import {AppActions, SET_ERROR} from '@src/store/action-types';
import {setError} from '@src/modules/issues';

const errorMiddleware: Middleware<{}, { dispatch: any }> = ({dispatch}) => (next) => (action: any) => {
  if (action.type === SET_ERROR && action.payload) {
    const timer = setTimeout(() => {
      dispatch(setError(null));
    }, 3000);

    action.timer = timer;
  }

  return next(action);
};

export default errorMiddleware;
