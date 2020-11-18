import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../store/actions/actions';
import Field from './Field';
import styles from '../styles/App.css';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  updateTableName: (data) => dispatch(actions.updateTableName(data)),
  addField: (data) => dispatch(actions.addField(data)),
});

const Table = (props) => {
  const addField = () => {
    props.addField({
      id: props.table.id,
    });
  };

  const updateTableName = (event) => {
    console.log(props);
    const newName = event.target.value;
    props.updateTableName({
      id: props.table.id,
      name: newName,
    });
  };

  return (
    <div className={styles.table}>
      <div className={styles.tableHeader}>
        <input
          type="text"
          className={styles.tableName}
          value={props.table.name}
          onChange={updateTableName}
        />
      </div>
      <div className="table-body">
        {props.table.fields.map((field) => {
          return <Field field={field} key={field.id} table={props.table.id} />;
        })}
        <button
          className={`${styles.btn} ${styles.btnSuccess}`}
          onClick={addField}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
