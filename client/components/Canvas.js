import React from 'react';
import { connect } from 'react-redux';

import Table from './Table.js';
import styles from '../styles/App.css';

const mapStateToProps = (state) => ({
  tables: state.table.tables,
  schema: state.table.schemaOutput,
});

function Canvas(props) {
  let textArea = null;

  const copySchema = (e) => {
    textArea.select();
    document.execCommand('copy');
    e.target.focus();
  };

  return (
    <div className={styles.canvas}>
      <div className={styles.schema}>
        {props.tables.map((table) => (
          <Table table={table} key={table.id} />
        ))}
      </div>
      <div className={styles.output}>
        <textarea
          className={styles.outputText}
          value={props.schema}
          onChange={() => ''}
          ref={(textarea) => (textArea = textarea)}
        ></textarea>
        <button
          className={`${styles.copySchema} ${styles.btn}`}
          onClick={copySchema}
        >
          Copy
        </button>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, undefined)(Canvas);
