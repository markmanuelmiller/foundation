import { v4 as uuid } from 'uuid';

import * as types from '../actionTypes';
import getAttributes from '../../utils/getAttributes';

const initialState = {
  schemaName: 'Schema',
  tables: [],
  schemaOutput: '',
  sqlOutput: '',
};

const defaultField = () => ({
  name: 'field_name',
  type: 'STRING',
  id: uuid(),
  attributes: getAttributes('STRING'),
});

const tableReducer = (state = initialState, action) => {
  let updatedTableList;
  let updatedFields;

  switch (action.type) {
    case types.ADD_TABLE:
      const newTable = {
        name: 'table_name',
        fields: [defaultField()],
        id: uuid(),
      };
      const newTableList = state.tables.concat(newTable);
      return {
        ...state,
        tables: newTableList,
      };

    case types.DELETE_TABLE:
      return {
        ...state,
      };

    case types.UPDATE_TABLE_NAME:
      console.log(action);
      updatedTableList = state.tables.map((table) => {
        if (table.id === action.payload.id) {
          return {
            ...table,
            name: action.payload.name,
          };
        }
        return table;
      });

      return {
        ...state,
        tables: updatedTableList,
      };

    case types.ADD_FIELD:
      updatedTableList = state.tables.map((table) => {
        if (table.id === action.payload.id) {
          const newFields = table.fields.concat();
          newFields.push(defaultField());
          return {
            ...table,
            fields: newFields,
          };
        }
        return table;
      });
      return {
        ...state,
        tables: updatedTableList,
      };

    case types.UPDATE_FIELD_TYPE:
      console.log(action);
      updatedTableList = state.tables.map((table) => {
        if (table.id === action.payload.tableId) {
          updatedFields = table.fields.map((field) => {
            if (field.id === action.payload.fieldId) {
              return {
                ...field,
                type: action.payload.newType,
                attributes: getAttributes(action.payload.newType),
              };
            }
            return field;
          });
          return {
            ...table,
            fields: updatedFields,
          };
        }
        return table;
      });
      return {
        ...state,
        tables: updatedTableList,
      };

    case types.UPDATE_FIELD_NAME:
      console.log(action);
      updatedTableList = state.tables.map((table) => {
        if (table.id === action.payload.tableId) {
          updatedFields = table.fields.map((field) => {
            if (field.id === action.payload.fieldId) {
              return {
                ...field,
                name: action.payload.name,
              };
            }
            return field;
          });
          return {
            ...table,
            fields: updatedFields,
          };
        }
        return table;
      });
      return {
        ...state,
        tables: updatedTableList,
      };

    case types.UPDATE_SCHEMA_OUTPUT:
      console.log(action.payload);
      return {
        ...state,
        schemaOutput: action.payload,
      };

    default:
      return state;
  }
};

export default tableReducer;
