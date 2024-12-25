import {Alert, Snackbar} from '@mui/material';
import {hideNotification} from './notification-slice';
import {useAppDispatch, useAppSelector} from '@src/modules/issues/hooks/hooks';

const Notification = () => {
  const dispatch = useAppDispatch();
  const {open, message} = useAppSelector((state) => state.notification);

  const handleClose = () => {
    dispatch(hideNotification());
  };

  if (!open) {
    return null;
  }

  return (
    <Snackbar
      open={open}
      anchorOrigin={{vertical: 'top', horizontal: 'right'}}
      message={message}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert severity="error" sx={{width: '100%'}}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
