import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../store/actions/actions';
import generateSchema from '../utils/generateSchema';
import styles from '../styles/App.css';

const mapStateToProps = (state) => ({
  schema: state.table,
});
const mapDispatchToProps = (dispatch) => ({
  addTable: () => dispatch(actions.addTable()),
  updateSchemaOutput: (data) => dispatch(actions.updateSchemaOutput(data)),
});

const MainControls = (props) => {
  function addTable() {
    console.log(props);
    console.log('add table');
    props.addTable();
  }

  function addJoin() {
    console.log('add join');
  }

  function schemaHandler() {
    console.log('generating schema');
    console.log(props.schema);
    const schema = generateSchema(props.schema);
    props.updateSchemaOutput(schema);
    fetch('/api/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ schema: schema }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  return (
    <div className={styles.mainControls}>
      <div className={styles.tableControls}>
        <button onClick={addTable} className={styles.btn}>
          Add Table
        </button>
        <button onClick={addJoin} className={styles.btn}>
          Add Join
        </button>
      </div>
      <div className="schema-controls">
        <button onClick={schemaHandler} className={styles.btn}>
          Generate Schema
        </button>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainControls);
