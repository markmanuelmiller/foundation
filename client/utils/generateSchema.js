/**
 *
 * @param {*} attribute
 *
 * attribute = {
 *   type: 'allowNull' || 'maxLength' || ...
 *   value: true || false || 'Im a comment'
 *   displayName: 'Allow null' || 'Max length' || ...
 * }
 */

const createAttribute = (attribute) => {
  switch (attribute.type) {
    case 'allowNull':
      return 'allowNull: true';
    case 'maxLength':
      return 'maxLength: ';
    case 'defaultValue':
      return 'defaultValue';
    case 'unique':
      return 'unique: true';
    case 'primaryKey':
      return 'primaryKey: true';
    case 'autoIncrement':
      return 'autoIncrement: true';
    case 'comment':
      return 'comment: im a comment';
    default:
      return '';
  }
};

const createField = (field) => {
  const attributes = {};

  return `${field.name}: { type: DataTypes.${field.type} },`;
};

const createModel = (table) => {
  // const attributes = table.fields.map((field) => {
  //   return createField(field);
  // });
  const attributesString = table.fields.reduce((acc, field) => {
    return (acc += createField(field));
  }, '');
  console.log(attributesString);
  return `const ${table.name} = sequelize.define('${table.name}', { ${attributesString} }, {});`;
};

const generateSchema = (state) => {
  const schema = state.tables.map((table) => {
    return createModel(table);
  });
  console.log(schema);
  return schema;
};

export default generateSchema;
