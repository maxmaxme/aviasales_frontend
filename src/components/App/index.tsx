import React, { useContext, useEffect } from 'react';
import { Tickets } from '../Tickets';
import { Filter } from '../Filter';
import { Tabs } from '../Tabs';
import { Header } from '../Header';
import './index.css';
import { resolveSearchId } from '../../resolvers/resolveSearchId';
import { resolveTickets } from '../../resolvers/resolveTickets';
import { Types } from '../../reducers';
import { AppContext } from '../../context';

export const App = () => {
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    resolveSearchId()
      .then((searchId) => resolveTickets(searchId,
        ((tickets) => {
          dispatch({
            type: Types.AddTickets,
            payload: tickets,
          });
        })))
      .then(() => {
        dispatch({
          type: Types.SetLoading,
          payload: false,
        });
      });
  }, []);

  return (
    <div className="App">
      <Header/>
      <div className="App__content">
        <Filter/>
        <div>
          <Tabs/>
          <Tickets/>
        </div>
      </div>
    </div>
  );
};
