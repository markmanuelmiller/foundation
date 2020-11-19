import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../store/actions/actions';
import generateSchema from '../utils/generateSchema';
import styles from '../styles/App.css';

const mapStateToProps = (state) => ({
  schema: state.table,
});
const mapDispatchToProps = (dispatch) => ({
  addTable: (data) => dispatch(actions.addTable(data)),
  updateSchemaOutput: (data) => dispatch(actions.updateSchemaOutput(data)),
});

const MainControls = (props) => {
  function addTable() {
    props.addTable('standard');
  }

  function addJoin() {
    props.addTable('join');
  }

  function schemaHandler() {
    const schema = generateSchema(props.schema);
    props.updateSchemaOutput(schema);
  }

  function buildHandler() {
    fetch('/api/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ schema: props.schema.schemaOutput }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  return (
    <div className={styles.mainControls}>
      <h1 className={styles.mainControlsHeader}>Foundation 🏗️</h1>
      <p>
        Prototype your database schemas in seconds{' '}
        <span className={styles.larger}>🏎️💨</span>
      </p>
      <div className={styles.tableControls}>
        <button onClick={addTable} className={styles.btn}>
          Add Table
        </button>
        <br />
        <button onClick={addJoin} className={styles.btn}>
          Add Join
        </button>
      </div>
      <div className="schema-controls">
        <button onClick={schemaHandler} className={styles.btn}>
          Generate Schema
        </button>
        <br />
        <button onClick={buildHandler} className={styles.btn}>
          Build Schema
        </button>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainControls);
