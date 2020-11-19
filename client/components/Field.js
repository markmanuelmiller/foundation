import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../store/actions/actions';
import FieldTypes from './FieldTypes';
import FieldAttributes from './FieldAttributes';
import styles from '../styles/App.css';

const mapDispatchToProps = (dispatch) => ({
  updateFieldType: (data) => dispatch(actions.updateFieldType(data)),
  updateFieldName: (data) => dispatch(actions.updateFieldName(data)),
  updateFieldAttribute: (data) => dispatch(actions.updateFieldAttribute(data)),
});

const Field = (props) => {
  const updateFieldType = (type) => {
    props.updateFieldType({
      tableId: props.table,
      newType: type,
      fieldId: props.field.id,
    });
  };

  const updateFieldName = (name) => {
    props.updateFieldName({
      tableId: props.table,
      name,
      fieldId: props.field.id,
    });
  };

  const updateAttribute = (attr) => {
    props.updateFieldAttribute(attr);
  };

  return (
    <div className={styles.field}>
      <input
        type="text"
        className={styles.fieldName}
        value={props.field.name}
        onChange={(e) => updateFieldName(e.target.value)}
      />
      <FieldTypes
        updateFieldType={updateFieldType}
        currentType={props.field.type}
      />
      <FieldAttributes
        attributes={props.field.attributes}
        table={props.table}
        field={props.field.id}
        updateAttribute={updateAttribute}
        className={styles.attributes}
      />
    </div>
  );
};

export default connect(undefined, mapDispatchToProps)(Field);
