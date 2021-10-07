import React, { ChangeEvent, useContext, useState } from 'react';
import { declOfNum } from '../../helpers/numbers';
import { addValue, removeValue } from '../../helpers/arrays';
import { Checkbox } from '../Checkbox';
import './index.css';
import { AppContext } from '../../context';
import { Types } from '../../reducers';

const getCheckboxLabel = (stopCount: number) => {
  return stopCount ? declOfNum(stopCount, ['%s пересадка', '%s пересадки', '%s пересадок'])
    .replace('%s', stopCount.toString()) : 'Без пересадок';
};

export const Filter = () => {
  const { state: { filters: { stopsCount } }, dispatch } = useContext(AppContext);
  const [ticketsStopsCount] = useState<number[]>([1, 3]);

  const onChangeStopsCount = (stopCount: number) => (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: Types.SetStopsCount,
      payload: e.target.checked ?
        addValue(stopCount, stopsCount) :
        removeValue(stopCount, stopsCount),
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
