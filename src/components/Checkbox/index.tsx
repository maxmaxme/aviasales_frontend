import React, { ChangeEvent } from 'react';
import './index.css';

export const Checkbox = ({ title, checked, onChange }: { title: string, checked: boolean, onChange: (e: ChangeEvent<HTMLInputElement>) => void }) => {
  return (
    <label className="Checkbox">
      <input className="Checkbox__input" type="checkbox" checked={checked} onChange={onChange}/>
      <span className="Checkbox__box"/>
      {title}
    </label>
  );
};
