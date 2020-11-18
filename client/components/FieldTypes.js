import React from 'react';
import types from '../utils/fieldTypes';

const FieldTypes = (props) => {
  // const fieldType = 'STRING'
  const fieldType = 'STRING';

  return (
    <select
      value={props.currentType}
      onChange={(e) => props.updateFieldType(e.target.value)}
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
