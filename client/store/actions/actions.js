import * as types from '../actionTypes';

export const addTable = (data) => ({
  type: types.ADD_TABLE,
  payload: data,
});

export const deleteTable = (data) => ({
  type: types.DELETE_TABLE,
  payload: data,
});

export const updateTableName = (data) => ({
  type: types.UPDATE_TABLE_NAME,
  payload: data,
});

export const addField = (data) => ({
  type: types.ADD_FIELD,
  payload: data,
});

export const deleteField = (data) => ({
  type: types.DELETE_FIELD,
  payload: data,
});

export const updateFieldName = (data) => ({
  type: types.UPDATE_FIELD_NAME,
  payload: data,
});

export const updateFieldType = (data) => ({
  type: types.UPDATE_FIELD_TYPE,
  payload: data,
});

export const updateSchemaOutput = (data) => ({
  type: types.UPDATE_SCHEMA_OUTPUT,
  payload: data,
});
