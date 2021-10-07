import React, { createContext, useReducer, Dispatch } from 'react';
import { ticketReducer, shoppingCartReducer, TicketActions, ShoppingCartActions } from './reducers';
import { Ticket } from './entities/ticket';
import ApiResponse from './tickets.json';

type InitialStateType = {
  tickets: Ticket[];
  shoppingCart: number;
}

const initialState = {
  tickets: ApiResponse.tickets.sort(() => .5 - Math.random()).slice(0, 10),
  shoppingCart: 0,
};

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<TicketActions | ShoppingCartActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = ({ tickets, shoppingCart }: InitialStateType, action: TicketActions | ShoppingCartActions) => ({
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
