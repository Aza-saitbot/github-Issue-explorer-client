import { createRoot } from 'react-dom/client';
import './index.scss';
import App from '@src/App';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store';
import './styles/main.scss';


createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>

);
