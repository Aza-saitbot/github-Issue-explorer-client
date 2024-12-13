import { Route, Routes } from 'react-router-dom';
import {IssueCard, IssueList} from './modules/issues';
import './App.scss'
import Header from '@src/components/Header/Header';

const App = () => {
  return (
      <div className={'app'}>
        <Header/>
        <Routes>
          <Route path="/" element={<IssueList />} />
          <Route path="/issues/:id" element={<IssueCard />} />
        </Routes>
      </div>
  );
};

export default App;
