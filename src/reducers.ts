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
  AddStopCount = 'ADD_STOP_COUNT',
  // eslint-disable-next-line no-unused-vars
  RemoveStopCount = 'REMOVE_STOP_COUNT',
  // eslint-disable-next-line no-unused-vars
  SetStopsCount = 'SET_STOPS_COUNT',
  // eslint-disable-next-line no-unused-vars
  Add = 'ADD_PRODUCT',
}

// Product

type TicketPayload = {
  [Types.SetTickets] : Ticket[];
}

export type TicketActions = ActionMap<TicketPayload>[keyof ActionMap<TicketPayload>];

export const ticketReducer = (state: Ticket[], action: TicketActions | ShoppingCartActions | SortActions | FiltersActions) => {
  switch (action.type) {
  case Types.SetTickets:
    return action.payload;
  default:
    return state;
  }
};

type FiltersPayload = {
  [Types.SetStopsCount] : number[];
  [Types.AddStopCount] : number;
  [Types.RemoveStopCount] : number;
}

export type FiltersActions = ActionMap<FiltersPayload>[keyof ActionMap<FiltersPayload>];

export const filtersReducer = (state: {stopsCount: number[]}, action: TicketActions | ShoppingCartActions | SortActions | FiltersActions) => {
  switch (action.type) {
  case Types.SetStopsCount:
    return {
      ...state,
      stopsCount: action.payload,
    };
  case Types.AddStopCount:
    return {
      ...state,
      stopsCount: !state.stopsCount.includes(action.payload) ?
        [...state.stopsCount, action.payload] : state.stopsCount,
    };
  case Types.RemoveStopCount:
    return {
      ...state,
      stopsCount: state.stopsCount.filter((stopCount) => {
        return stopCount !== action.payload;
      }),
    };
  default:
    return state;
  }
};

// Sort

type SortPayload = {
  [Types.SetSort] : TabIds;
}

export type SortActions = ActionMap<SortPayload>[keyof ActionMap<SortPayload>];

export const sortReducer = (state: TabIds, action: SortActions | TicketActions | ShoppingCartActions | FiltersActions) => {
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

export const shoppingCartReducer = (state: number, action: TicketActions | ShoppingCartActions | SortActions | FiltersActions) => {
  switch (action.type) {
  case Types.Add:
    return state + 1;
  default:
    return state;
  }
};
