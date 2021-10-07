import React from 'react';
import { Tickets } from './components/Tickets';
import { Ticket } from './entities/ticket';
import ApiResponse from './tickets.json';
import './App.css';

export const App = () => {
  const tickets: Ticket[] = ApiResponse.tickets.sort(() => .5 - Math.random()).slice(0, 10);
  return (
    <div className="App">
      <div className="App__content">
        <Tickets tickets={tickets} />
      </div>
    </div>
  );
};
