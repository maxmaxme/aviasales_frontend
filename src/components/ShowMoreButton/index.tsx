import React, { useContext } from 'react';
import './index.css';
import { AppContext } from '../../context';
import { Types } from '../../reducers';

export const ShowMoreButton = () => {
  const { dispatch } = useContext(AppContext);
  const onClick = () => dispatch({
    type: Types.LoadMoreTickets,
  });
  return (
    <button className="ShowMoreButton" onClick={onClick}>Показать еще 5 билетов!</button>
  );
};
