import React, { ChangeEvent, useState } from 'react';
import { declOfNum } from '../../helpers/numbers';
import { addValue, removeValue } from '../../helpers/arrays';
import { Checkbox } from '../Checkbox';
import './index.css';

const getCheckboxLabel = (stopCount: number) => {
  return stopCount ? declOfNum(stopCount, ['%s пересадка', '%s пересадки', '%s пересадок'])
    .replace('%s', stopCount.toString()) : 'Без пересадок';
};

export const Filter = () => {
  const [selectedStopsCount, setSelectedStopsCount] = useState<number[]>([]);
  const [stopsCount] = useState<number[]>([1, 3]);

  const onChangeStopsCount = (stopCount: number) => (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedStopsCount(e.target.checked ?
      addValue(stopCount, selectedStopsCount) :
      removeValue(stopCount, selectedStopsCount));
  };
  const onChangeAll = () => setSelectedStopsCount([]);

  return (
    <div className="Filter">
      <div className="Filter__header">Количество пересадок</div>
      <label className="Filter__item">
        <Checkbox
          checked={!selectedStopsCount.length}
          onChange={onChangeAll}
          title="Все"/>
      </label>
      {stopsCount.map((stopCount) => (
        <label key={stopCount} className="Filter__item">
          <Checkbox
            checked={selectedStopsCount.includes(stopCount)}
            onChange={onChangeStopsCount(stopCount)}
            title={getCheckboxLabel(stopCount)}/>
        </label>
      ),
      )}
    </div>
  );
};
