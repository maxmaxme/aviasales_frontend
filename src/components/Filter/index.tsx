import React, { ChangeEvent, useContext } from 'react';
import { declOfNum } from '../../helpers/numbers';
import { Checkbox } from '../Checkbox';
import './index.css';
import { AppContext } from '../../context';
import { Types } from '../../reducers';

const getCheckboxLabel = (stopCount: number) => {
  return stopCount ? declOfNum(stopCount, ['%s пересадка', '%s пересадки', '%s пересадок'])
    .replace('%s', stopCount.toString()) : 'Без пересадок';
};

export const Filter = () => {
  const { state: { tickets, filters: { stopsCount } }, dispatch } = useContext(AppContext);
  const ticketsStopsCount = tickets.map((ticket) => ticket.segments
    .map((segment) => segment.stops.length)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0))
    .filter((v, i, a) => a.indexOf(v) === i)
    .sort();

  const onChangeStopsCount = (stopCount: number) => (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: e.target.checked ? Types.AddStopCount : Types.RemoveStopCount,
      payload: stopCount,
    });
  };
  const onChangeAll = () => dispatch({
    type: Types.SetStopsCount,
    payload: [],
  });

  return (
    <div className="Filter">
      <div className="Filter__header">Количество пересадок</div>
      <label className="Filter__item">
        <Checkbox
          checked={!stopsCount.length}
          onChange={onChangeAll}
          title="Все"/>
      </label>
      {ticketsStopsCount.map((stopCount) => (
        <label key={stopCount} className="Filter__item">
          <Checkbox
            checked={stopsCount.includes(stopCount)}
            onChange={onChangeStopsCount(stopCount)}
            title={getCheckboxLabel(stopCount)}/>
        </label>
      ),
      )}
    </div>
  );
};
