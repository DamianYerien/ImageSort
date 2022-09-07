import React from 'react';
import { SortableElement } from 'react-sortable-hoc';
import style from "./App.module.css"

const SortableItem = (props) => {
  return <li>
    <div className={style.li}>
    <p>{props.idx +1}</p>
    <p>{props.value}</p>
    </div>
  <img src={props.value} alt={props.value} width="200" height="auto"/>
  </li>
}

export default SortableElement(SortableItem);