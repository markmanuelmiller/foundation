import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../store/actions/actions';
import styles from '../styles/App.css';

const mapStateToProps = (state) => ({
  tables: state.table.tables,
});
const mapDispatchToProps = (dispatch) => ({});

const FieldAttributes = (props) => {
  const updateAttribute = (e, attr) => {
    if (e.target.type === 'checkbox') {
      attr.value = e.target.checked;
    } else {
      attr.value = e.target.value;
    }
    const data = {
      table: props.table,
      field: props.field,
      attr,
    };
    props.updateAttribute(data);
  };

  let template = props.attributes.map((attr) => {
    let temp = null;
    switch (attr.type) {
      case 'allowNull':
      case 'unique':
        // return <input type="checkbox" id={attr.type} />;
        temp = (
          <input
            type="checkbox"
            // key={attr.id}
            onChange={(e) => updateAttribute(e, attr)}
          />
        );
        break;
      case 'maxLength':
        // return <input type="number" id={attr.type} />;
        temp = (
          <input
            type="number"
            // key={attr.id}
            onChange={(e) => updateAttribute(e, attr)}
          />
        );
        break;
      case 'defaultValue':
      case 'comment':
        temp = (
          <input
            type="text"
            // key={attr.id}
            onChange={(e) => updateAttribute(e, attr)}
          />
        );
        // return <input type="text" id={attr.type} />;
        break;
      case 'reference':
        console.log(props);
        temp = (
          <select onChange={(e) => updateAttribute(e, attr)}>
            {props.tables
              .filter((table) => table.id !== props.table)
              .map((table) => {
                return (
                  <option value={table.id} key={table.id}>
                    {table.name}
                  </option>
                );
              })}
          </select>
        );
        break;
      default:
        // return <input type="text" id={attr.type} />;
        temp = (
          <input
            type="text"
            // key={attr.id}
            onChange={(e) => updateAttribute(e, attr)}
          />
        );
        break;
    }
    return (
      <div key={attr.id} className={styles.attribute}>
        <label>{attr.displayName}: </label>
        {temp}
      </div>
    );
  });

  return <div className={styles.attributes}>{template}</div>;
};

export default connect(mapStateToProps, mapDispatchToProps)(FieldAttributes);
