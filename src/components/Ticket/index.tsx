import React from 'react';
import { Ticket as TicketType } from '../../entities/ticket';
import { TicketSegment } from '../TicketSegment';
import './index.css';

type Params = {
  ticket: TicketType,
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
  }).format(price);
};

export const Ticket = ({ ticket }: Params) => {
  return (
    <div className="Ticket">
      <div className="Ticket__header">
        <div className="Ticket__price">{formatPrice(ticket.price)}</div>
        <div className="Ticket__carrierLogo">
          <img src={`//pics.avs.io/99/36/${ticket.carrier}.png`} alt="" />
        </div>
      </div>
      <div className="Ticket__segments">
        {ticket.segments.map((segment, index) => (
          <div key={index} className="Ticket__segment">
            <TicketSegment segment={segment} />
          </div>
        ))}
      </div>
    </div>
  );
};

