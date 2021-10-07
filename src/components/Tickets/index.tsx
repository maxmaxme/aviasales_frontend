import React from 'react';
import { Ticket as TicketType } from '../../entities/ticket';
import { Ticket } from '../Ticket';
import './index.css';

type Params = {
  tickets: TicketType[],
}

export const Tickets = ({ tickets }: Params) => {
  return (
    <div className="Tickets">
      {tickets.map((ticket, index) => (
        <div key={index} className="Tickets__ticket">
          <Ticket ticket={ticket} />
        </div>
      ))}
    </div>
  );
};
