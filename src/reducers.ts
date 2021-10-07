import { Ticket } from './entities/ticket';
import { TabIds } from './entities/tab';

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
      type: Key;
    }
    : {
      type: Key;
      payload: M[Key];
    }
};

export enum Types {
  // eslint-disable-next-line no-unused-vars
  SetTickets = 'SET_TICKETS',
  // eslint-disable-next-line no-unused-vars
  SetSort = 'SET_SORT',
  // eslint-disable-next-line no-unused-vars
  Add = 'ADD_PRODUCT',
}

// Product

type TicketPayload = {
  [Types.SetTickets] : Ticket[];
}

export type TicketActions = ActionMap<TicketPayload>[keyof ActionMap<TicketPayload>];

export const ticketReducer = (state: Ticket[], action: TicketActions | ShoppingCartActions | SortActions) => {
  switch (action.type) {
  case Types.SetTickets:
    return action.payload;
  default:
    return state;
  }
};

// Sort

type SortPayload = {
  [Types.SetSort] : TabIds;
}

export type SortActions = ActionMap<SortPayload>[keyof ActionMap<SortPayload>];

export const sortReducer = (state: TabIds, action: SortActions | TicketActions | ShoppingCartActions) => {
  switch (action.type) {
  case Types.SetSort:
    return action.payload;
  default:
    return state;
  }
};

// ShoppingCart

type ShoppingCartPayload = {
  [Types.Add]: undefined;
}

export type ShoppingCartActions = ActionMap<ShoppingCartPayload>[keyof ActionMap<ShoppingCartPayload>];

export const shoppingCartReducer = (state: number, action: TicketActions | ShoppingCartActions | SortActions) => {
  switch (action.type) {
  case Types.Add:
    return state + 1;
  default:
    return state;
  }
};
