import React from 'react';
import { connect } from 'react-redux';

import Table from './Table.js';
import styles from '../styles/App.css';

const mapStateToProps = (state) => ({
  tables: state.table.tables,
  schema: state.table.schemaOutput,
});

function Canvas(props) {
  return (
    <div className={styles.canvas}>
      <div className={styles.schema}>
        {props.tables.map((table) => (
          <Table table={table} key={table.id} />
        ))}
      </div>
      <div className={styles.output}>
        <textarea className={styles.outputText} value={props.schema}></textarea>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, undefined)(Canvas);
