import { createRoot } from 'react-dom/client';
import './index.scss';
import App from '@src/App';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';


createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </BrowserRouter>
  </Provider>

);
