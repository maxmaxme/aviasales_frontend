import React from 'react';
import { Tickets } from '../Tickets';
import { Filter } from '../Filter';
import { Tabs } from '../Tabs';
import { Header } from '../Header';
import { Ticket } from '../../entities/ticket';
import ApiResponse from '../../tickets.json';
import './index.css';

export const App = () => {
  const tickets: Ticket[] = ApiResponse.tickets.sort(() => .5 - Math.random()).slice(0, 10);
  return (
    <div className="App">
      <Header />
      <div className="App__content">
        <Filter />
        <div>
          <Tabs />
          <Tickets tickets={tickets} />
        </div>
      </div>
    </div>
  );
};
