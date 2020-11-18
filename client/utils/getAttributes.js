import { v4 as uuid } from 'uuid';

const attrs = {
  allowNull: () => ({
    type: 'allowNull',
    displayName: 'Allow null',
    value: null,
    id: uuid(),
  }),
  maxLength: () => ({
    type: 'maxLength',
    displayName: 'Max length',
    value: null,
    id: uuid(),
  }),
  defaultValue: () => ({
    type: 'defaultValue',
    displayName: 'Default value',
    value: null,
    id: uuid(),
  }),
  unique: () => ({
    type: 'unique',
    displayName: 'Unique',
    value: null,
    id: uuid(),
  }),
  primaryKey: () => ({
    type: 'primaryKey',
    displayName: 'Primary key',
    value: null,
    id: uuid(),
  }),
  autoIncrement: () => ({
    type: 'autoIncrement',
    displayName: 'Auto increment',
    value: null,
    id: uuid(),
  }),
  comment: () => ({
    type: 'comment',
    displayName: 'Comment',
    value: null,
    id: uuid(),
  }),
};

const getAttributes = (type) => {
  const attributes = [];

  switch (type) {
    case 'STRING':
      attributes.push(
        attrs.allowNull(),
        attrs.maxLength(),
        attrs.defaultValue(),
        attrs.unique(),
        attrs.comment()
      );
      break;
    case 'BOOLEAN':
      attributes.push(attrs.allowNull(), attrs.defaultValue(), attrs.comment());
      break;
    case 'INTEGER':
      attributes.push(
        attrs.allowNull(),
        attrs.maxLength(),
        attrs.defaultValue(),
        attrs.unique(),
        attrs.autoIncrement(),
        attrs.comment()
      );
      break;
    case 'FK':
      attributes.push(attrs.allowNull(), attrs.comment());
      break;
    case 'DATE':
      attributes.push(attrs.allowNull(), attrs.defaultValue(), attrs.comment());
      break;
    default:
    // attributes.push('');
  }

  return attributes;
};

export default getAttributes;
