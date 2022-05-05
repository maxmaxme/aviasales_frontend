import { Ticket } from '../entities/ticket';
import { getMethodUrl } from './base';

export const resolveTickets = (searchId: string, onLoadTickets: (tickets: Ticket[]) => void, attempt = 1): Promise<void> => {
  const url = getMethodUrl('tickets') + `?attempt=${attempt}&searchId=${searchId}`;
  return fetch(url)
    .then((r) => r.ok ? r.json() : { tickets: [], stop: false })
    .then(({ tickets, stop }) => {
      onLoadTickets(tickets);
      if (!stop) {
        return resolveTickets(searchId, onLoadTickets, attempt + 1);
      }
      return Promise.resolve();
    });
};
