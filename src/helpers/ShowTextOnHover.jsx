import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import style from './ShowTextOnHover.module.css';

const ShowTextOnHover = (props) => {
  let { children, ShownText } = props;
  return (
    <div className={style.icon} key={'Checkbox'}>
      <div className={style.tooltip}>{ShownText}</div>
      <span>{children}</span>
    </div>
  );
};

export default ShowTextOnHover;
