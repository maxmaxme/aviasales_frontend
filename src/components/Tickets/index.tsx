import React, { useContext } from 'react';
import { Ticket } from '../Ticket';
import './index.css';
import { ShowMoreButton } from '../ShowMoreButton';
import { AppContext } from '../../context';

export const Tickets = () => {
  const { state: { tickets } } = useContext(AppContext);
  return (
    <div className="Tickets">
      <div className="Tickets__list">
        {tickets.map((ticket, index) => (
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

