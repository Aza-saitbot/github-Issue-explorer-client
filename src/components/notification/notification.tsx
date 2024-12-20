import { Snackbar } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { hideNotification } from './notification-slice';
import './notification.scss'

const Notification = () => {
  const dispatch = useDispatch();
  const { open, message } = useSelector((state: any) => state.notifications);

  const handleClose = () => {
    dispatch(hideNotification());
  };

  return (
    <Snackbar
      className={'notification'}
      open={open}
      message={message}
      autoHideDuration={3000}
      onClose={handleClose}
    />
  );
};

export default Notification;
