import React, { createContext, useReducer, Dispatch } from 'react';
import { ticketReducer, sortReducer, filtersReducer, Actions, loadingReducer } from './reducers';
import { Ticket } from './entities/ticket';
import { TAB_IDS, TabIds } from './entities/tab';

type InitialStateType = {
  loading: boolean,
  tickets: Ticket[];
  sort: TabIds;
  filters: {
    ticketsLimit: number,
    stopsCount: number[],
  };
}

const initialState = {
  loading: true,
  tickets: [],
  sort: TAB_IDS.OPTIMAL,
  filters: {
    ticketsLimit: 5,
    stopsCount: [],
  },
};

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<Actions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = ({ tickets, sort, filters, loading }: InitialStateType, action: Actions) => ({
  loading: loadingReducer(loading, action),
  filters: filtersReducer(filters, action),
  sort: sortReducer(sort, action),
  tickets: ticketReducer(tickets, action),
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
