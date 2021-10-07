import React, { useContext } from 'react';
import cn from 'classnames';
import { Tab as TabType, TAB_IDS, TabIds } from '../../entities/tab';
import './index.css';
import { AppContext } from '../../context';
import { Types } from '../../reducers';

const Tab = ({ title, selected, onSelect }: {title: string, selected: boolean, onSelect: () => void}) => {
  return (
    <button className={cn('Tabs__tab', { 'Tabs__tab--selected': selected })} onClick={onSelect}>
      {title}
    </button>
  );
};

export const Tabs = () => {
  const { state: { sort }, dispatch } = useContext(AppContext);
  const tabs: TabType[] = [
    { id: TAB_IDS.CHEAP, title: 'Самый дешёвый' },
    { id: TAB_IDS.FAST, title: 'Самый быстрый' },
    { id: TAB_IDS.OPTIMAL, title: 'Оптимальный' },
  ];
  const onSelect = (tabId: TabIds) => () => dispatch({
    type: Types.SetSort,
    payload: tabId,
  });

  return (
    <div className="Tabs">
      {tabs.map((tab) => (
        <Tab key={tab.id} title={tab.title} selected={tab.id === sort} onSelect={onSelect(tab.id)} />
      ))}
    </div>
  );
};
