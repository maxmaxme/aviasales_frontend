import React from 'react';
import { Tickets } from '../Tickets';
import { Filter } from '../Filter';
import { Tabs } from '../Tabs';
import { Header } from '../Header';
import './index.css';

export const App = () => {
  return (
    <div className="App">
      <Header />
      <div className="App__content">
        <Filter />
        <div>
          <Tabs />
          <Tickets />
        </div>
      </div>
    </div>
  );
};
