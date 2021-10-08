import React from 'react';
import { TicketSegment as TicketSegmentType } from '../../entities/ticket';
import './index.css';
import { declOfNum } from '../../helpers/numbers';

type Params = {
  segment: TicketSegmentType,
}

const withZero = (n: number) => n < 10 ? `0${n}` : n;
const getDuration = (totalMinutes: number) => {
  const days = Math.floor(totalMinutes / 1440); // 60*24
  const hours = Math.floor((totalMinutes - (days * 1440)) / 60);
  const minutes = Math.round(totalMinutes % 60);

  if (days) {
    return `${days}д ${hours}ч ${withZero(minutes)}м`;
  } else {
    return `${hours}ч ${withZero(minutes)}м`;
  }
};

const getStopsText = (stopsCount: number) => {
  if (!stopsCount) {
    return 'без пересадок';
  }

  return declOfNum(stopsCount, ['%s пересадка', '%s пересадки', '%s пересадок'])
    .replace('%s', stopsCount.toString());
};

export const TicketSegment = ({ segment }: Params) => {
  const departureDate = new Date(segment.date);
  const departureDateHM = `${withZero(departureDate.getUTCHours())}:${withZero(departureDate.getUTCMinutes())}`;
  const arrivalDate = new Date(departureDate.getTime() + segment.duration * 60000);
  const arrivalDateHM = `${withZero(arrivalDate.getUTCHours())}:${withZero(arrivalDate.getUTCMinutes())}`;

  return (
    <div className="TicketSegment">
      <div className="TicketSegment__data">
        <div className="TicketSegment__dataHeader">{segment.origin} – {segment.destination}</div>
        <div className="TicketSegment__dataText">{departureDateHM} – {arrivalDateHM}</div>
      </div>
      <div className="TicketSegment__data">
        <div className="TicketSegment__dataHeader">в пути</div>
        <div className="TicketSegment__dataText">{getDuration(segment.duration)}</div>
      </div>
      <div className="TicketSegment__data">
        <div className="TicketSegment__dataHeader">{getStopsText(segment.stops.length)}</div>
        <div className="TicketSegment__dataText">{segment.stops.join(', ')}</div>
      </div>
    </div>
  );
};
