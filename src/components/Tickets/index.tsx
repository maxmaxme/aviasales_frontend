import React, { useContext } from 'react';
import { Ticket } from '../Ticket';
import './index.css';
import { ShowMoreButton } from '../ShowMoreButton';
import { AppContext } from '../../context';

export const Tickets = () => {
  const { state: { tickets, filters } } = useContext(AppContext);
  const filteredTickets = tickets.filter((ticket) => {
    if (filters.stopsCount.length) {
      const ticketStopsCount = ticket.segments
        .map((segment) => segment.stops.length)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      return filters.stopsCount.includes(ticketStopsCount);
    }

    return true;
  });
  return (
    <div className="Tickets">
      <div className="Tickets__list">
        {filteredTickets.slice(0, 5).map((ticket, index) => (
          <div key={index} className="Tickets__ticket">
            <Ticket ticket={ticket} />
          </div>
        ))}
      </div>
      <div className="Tickets__showMoreButton">
        <ShowMoreButton />
      </div>
    </div>
  );
};

