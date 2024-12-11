import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IssueList from './modules/issues/components/IssueList';
import IssueDetails from './modules/issues/components/IssueDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IssueList />} />
        <Route path="/issue/:id" element={<IssueDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
