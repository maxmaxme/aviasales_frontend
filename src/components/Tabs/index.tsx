import React, { useState } from 'react';
import cn from 'classnames';
import { Tab as TabType, TAB_IDS, TabIds } from '../../entities/tab';
import './index.css';

const Tab = ({ title, selected, onSelect }: {title: string, selected: boolean, onSelect: () => void}) => {
  return (
    <button className={cn('Tabs__tab', { 'Tabs__tab--selected': selected })} onClick={onSelect}>
      {title}
    </button>
  );
};

export const Tabs = () => {
  const [selectedTabId, setSelectedTabId] = useState<TabIds>(TAB_IDS.OPTIMAL);
  const tabs: TabType[] = [
    { id: TAB_IDS.CHEAP, title: 'Самый дешёвый' },
    { id: TAB_IDS.FAST, title: 'Самый быстрый' },
    { id: TAB_IDS.OPTIMAL, title: 'Оптимальный' },
  ];
  const onSelect = (tabId: TabIds) => () => setSelectedTabId(tabId);

  return (
    <div className="Tabs">
      {tabs.map((tab) => (
        <Tab key={tab.id} title={tab.title} selected={tab.id === selectedTabId} onSelect={onSelect(tab.id)} />
      ))}
    </div>
  );
};
