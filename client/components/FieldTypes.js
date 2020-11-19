import React from 'react';

import types from '../utils/fieldTypes';
import styles from '../styles/App.css';

const FieldTypes = (props) => {
  return (
    <select
      value={props.currentType}
      onChange={(e) => props.updateFieldType(e.target.value)}
      className={styles.fieldType}
    >
      {types.map((type) => {
        return (
          <option value={type.value} key={type.value}>
            {type.name}
          </option>
        );
      })}
    </select>
  );
};

export default FieldTypes;
