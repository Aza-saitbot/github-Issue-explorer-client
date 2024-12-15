import {Outlet} from 'react-router-dom';
import Header from '@src/components/Header/Header';
import './main.layout.scss'

const MainLayout = () => {
  return (
    <div className='main-layout'>
      <Header/>

      <main>
        <Outlet/>
      </main>
    </div>
  );
}

export default MainLayout;
