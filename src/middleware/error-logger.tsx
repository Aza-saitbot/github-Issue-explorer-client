import {isRejectedWithValue} from '@reduxjs/toolkit';
import type {MiddlewareAPI, Middleware} from '@reduxjs/toolkit';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import './error-logger.scss'


export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {

      // const [open, setOpen] = useState(true);

      const message = action.payload as string;
      console.log('message', message)
      // setOpen(true);

      const handleClose = () => {
        // setOpen(false);
      };

      return (
        <Snackbar
          open={true}
          autoHideDuration={6000}
          onClose={handleClose}
          message={message}
          className={'error-logger'}
        />
      );
    }

    return next(action);
  };