import React from 'react';
import './Spinner.scss';

export const Spinner: React.FC = () => (
  <div className="spinner">
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);

