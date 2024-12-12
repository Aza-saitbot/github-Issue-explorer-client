import { Route, Routes } from 'react-router-dom';
import {IssueDetails, IssueList} from './modules/issues';
import './App.scss'
import Header from '@src/components/Header/Header';

const App = () => {
  return (
      <div className={'app'}>
        <Header/>
        <Routes>
          <Route path="/" element={<IssueList />} />
          <Route path="/issue/:id" element={<IssueDetails />} />
        </Routes>
      </div>
  );
};

export default App;
