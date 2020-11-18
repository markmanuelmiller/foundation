import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../store/actions/actions';
import styles from '../styles/App.css';

const mapDispatchToProps = (dispatch) => ({});

const FieldAttributes = (props) => {
  console.log(props);

  let template = props.attributes.map((attr) => {
    let temp = null;
    switch (attr.type) {
      case 'allowNull' || 'unique':
        // return <input type="checkbox" id={attr.type} />;
        temp = <input type="checkbox" id={attr.type} />;
        break;
      case 'maxLength':
        // return <input type="number" id={attr.type} />;
        temp = <input type="number" id={attr.type} />;
        break;
      case 'defaultValue' || 'comment':
        temp = <input type="text" id={attr.type} />;
        // return <input type="text" id={attr.type} />;
        break;
      default:
        // return <input type="text" id={attr.type} />;
        temp = <input type="text" id={attr.type} />;
        break;
    }
    return (
      <div>
        <label>{attr.displayName}</label>
        {temp}
      </div>
    );
  });

  console.log(template);

  return <div className={styles.attributes}>{template}</div>;
};

export default connect(undefined, mapDispatchToProps)(FieldAttributes);
