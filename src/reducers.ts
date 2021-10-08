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
  AddTickets = 'ADD_TICKETS',
  // eslint-disable-next-line no-unused-vars
  SetSort = 'SET_SORT',
  // eslint-disable-next-line no-unused-vars
  AddStopCount = 'ADD_STOP_COUNT',
  // eslint-disable-next-line no-unused-vars
  RemoveStopCount = 'REMOVE_STOP_COUNT',
  // eslint-disable-next-line no-unused-vars
  SetStopsCount = 'SET_STOPS_COUNT',
  // eslint-disable-next-line no-unused-vars
  LoadMoreTickets = 'LOAD_MORE_TICKETS',
  // eslint-disable-next-line no-unused-vars
  SetLoading = 'SET_LOADING',
}

export type Actions = TicketActions | SortActions | FiltersActions | LoadingActions;

// Tickets

type TicketPayload = {
  [Types.AddTickets] : Ticket[];
}

export type TicketActions = ActionMap<TicketPayload>[keyof ActionMap<TicketPayload>];

export const ticketReducer = (state: Ticket[], action: Actions) => {
  switch (action.type) {
  case Types.AddTickets:
    return state.concat(...action.payload);
  default:
    return state;
  }
};

// Filters

type FiltersPayload = {
  [Types.SetStopsCount] : number[];
  [Types.AddStopCount] : number;
  [Types.RemoveStopCount] : number;
  [Types.LoadMoreTickets] : undefined;
}

export type FiltersActions = ActionMap<FiltersPayload>[keyof ActionMap<FiltersPayload>];

export const filtersReducer = (state: {stopsCount: number[], ticketsLimit: number}, action: Actions) => {
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
  case Types.LoadMoreTickets:
    return {
      ...state,
      ticketsLimit: state.ticketsLimit + 5,
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

export const sortReducer = (state: TabIds, action: Actions) => {
  switch (action.type) {
  case Types.SetSort:
    return action.payload;
  default:
    return state;
  }
};

// Loading

type LoadingPayload = {
  [Types.SetLoading] : boolean;
}

export type LoadingActions = ActionMap<LoadingPayload>[keyof ActionMap<LoadingPayload>];

export const loadingReducer = (state: boolean, action: Actions) => {
  switch (action.type) {
  case Types.SetLoading:
    return action.payload;
  default:
    return state;
  }
};
