import React, { useContext, useEffect, useState } from 'react';
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
  const [useFallbackApi, setUseFallbackApi] = useState(false);

  useEffect(() => {
    resolveSearchId(useFallbackApi)
      .then((searchId) => resolveTickets(useFallbackApi, searchId,
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
      })
      .catch(() => setUseFallbackApi(true));
  }, [useFallbackApi]);

  return (
    <div className="App">
      <Header />
      <div className="App__content">
        <Filter />
        <div>
          <Tabs />
          <Tickets />
        </div>
      </div>
    </div>
  );
};
