import React, { createContext, useReducer, Dispatch } from 'react';
import { ticketReducer, shoppingCartReducer, TicketActions, ShoppingCartActions, SortActions, sortReducer, FiltersActions, filtersReducer } from './reducers';
import { Ticket } from './entities/ticket';
import ApiResponse from './tickets.json';
import { TAB_IDS, TabIds } from './entities/tab';

type InitialStateType = {
  tickets: Ticket[];
  sort: TabIds;
  filters: {
    stopsCount: number[],
  };
  shoppingCart: number;
}

const initialState = {
  tickets: ApiResponse.tickets.sort(() => .5 - Math.random()).slice(0, 10),
  sort: TAB_IDS.OPTIMAL,
  filters: {
    stopsCount: [],
  },
  shoppingCart: 0,
};

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<TicketActions | SortActions | ShoppingCartActions | FiltersActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = ({ tickets, sort, filters, shoppingCart }: InitialStateType, action: SortActions | TicketActions | ShoppingCartActions | FiltersActions) => ({
  filters: filtersReducer(filters, action),
  sort: sortReducer(sort, action),
  tickets: ticketReducer(tickets, action),
  shoppingCart: shoppingCartReducer(shoppingCart, action),
});


const AppProvider: React.FC = ({ children }: any) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
