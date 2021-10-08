import React, { useContext } from 'react';
import { Ticket } from '../Ticket';
import './index.css';
import { ShowMoreButton } from '../ShowMoreButton';
import { AppContext } from '../../context';
import { TAB_IDS } from '../../entities/tab';

export const Tickets = () => {
  const { state: { tickets, filters, sort } } = useContext(AppContext);
  const filteredTickets = tickets.filter((ticket) => {
    if (filters.stopsCount.length) {
      const ticketStopsCount = ticket.segments
        .map((segment) => segment.stops.length)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      return filters.stopsCount.includes(ticketStopsCount);
    }

    return true;
  });

  const sortedTickets = filteredTickets.sort((a, b): number => {
    switch (sort) {
    case TAB_IDS.FAST:
      const timeA = a.segments
        .map((segment) => segment.duration)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      const timeB = b.segments
        .map((segment) => segment.duration)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

      return timeA - timeB;

    case TAB_IDS.CHEAP:
      return a.price - b.price;

    case TAB_IDS.OPTIMAL: // Считаем, что бекенд по умолчанию возвращает оптимальную сортировку ;)
    default:
      return 1;
    }
  });
  return (
    <div className="Tickets">
      <div className="Tickets__list">
        {sortedTickets.slice(0, 5).map((ticket, index) => (
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

