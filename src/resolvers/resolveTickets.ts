import { Ticket } from '../entities/ticket';

export const resolveTickets = (searchId: string, onLoadTickets: (tickets: Ticket[]) => void): Promise<void> => {
  const url = 'https://front-test.beta.aviasales.ru/tickets?searchId=' + searchId;
  return fetch(url)
    .then((r) => r.ok ? r.json() : { tickets: [], stop: false })
    .then(({ tickets, stop }) => {
      onLoadTickets(tickets);
      if (!stop) {
        return resolveTickets(searchId, onLoadTickets);
      }
      return Promise.resolve();
    });
};
