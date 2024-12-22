import {Outlet} from 'react-router-dom';
import Header from '@src/components/Header/Header';
import './main.layout.scss'
import Notification from '@src/components/notification/notification';

const MainLayout = () => {
  return (
    <div className='main-layout'>
      <Notification/>
      <Header/>

      <main>
        <Outlet/>
      </main>
    </div>
  );
}

export default MainLayout;
