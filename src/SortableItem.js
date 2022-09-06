import React from 'react';
import { SortableElement } from 'react-sortable-hoc';

const SortableItem = (props) => {
  return <li><img src={props.value} alt={props.value} width="200" height="auto"/></li>
}

export default SortableElement(SortableItem);