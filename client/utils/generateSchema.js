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
  const attributes = field.attributes.filter((attr) => {
    return attr.type !== 'maxLength';
  });
  const maxLength = field.attributes.filter((attr) => {
    return attr.type === 'maxLength' && attr.value !== null;
  });
  const fieldAttributes = attributes
    .filter((attr) => {
      return attr.value !== null;
    })
    .reduce((acc, curr) => {
      if (typeof curr.value === 'string') {
        return (acc += ` ${curr.type}: '${curr.value}', `);
      }
      return (acc += ` ${curr.type}: ${curr.value}, `);
    }, '');
  if (maxLength.length === 0) {
    return `${field.name}: { type: DataTypes.${field.type}, ${fieldAttributes} },`;
  }
  return `${field.name}: { type: DataTypes.${field.type}(${Number(
    maxLength[0].value
  )}), ${fieldAttributes} },`;
};

const createJoinModel = (table, tables) => {
  console.log(tables);
  const fks = table.fields
    .filter((field) => field.type === 'FK')
    .map((field) => {
      return field.attributes
        .filter((attr) => attr.type === 'reference')
        .map((attr) => {
          return attr.value;
        });
    })
    .flat();
  console.log(fks);
  const table1 = tables
    .filter((table) => table.id === fks[0])
    .map((table) => {
      return table.name;
    })
    .flat();
  const table2 = tables
    .filter((table) => table.id === fks[1])
    .map((table) => {
      return table.name;
    })
    .flat();
  // const attributesString = table.fields.reduce((acc, field) => {
  //   return (acc += createField(field));
  // }, '');
  return `const ${table.name} = sequelize.define('${table.name}', { 
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    }, {});
    
    ${table1[0]}.belongsToMany(${table2[0]}, { through: ${table.name} });
    ${table2[0]}.belongsToMany(${table1[0]}, { through: ${table.name} });`;
};

const createModel = (table) => {
  // const attributes = table.fields.map((field) => {
  //   return createField(field);
  // });
  const attributesString = table.fields.reduce((acc, field) => {
    return (acc += createField(field));
  }, '');
  return `const ${table.name} = sequelize.define('${table.name}', { ${attributesString} }, {});`;
};

const generateSchema = (state) => {
  // const schema = state.tables.map((table) => {
  //   return createModel(table);
  // });
  const tableSchema = state.tables
    .filter((table) => table.type === 'standard')
    .reduce((acc, table) => {
      return (acc += createModel(table) + '\n\n');
    }, '');

  const joinSchema = state.tables
    .filter((table) => table.type === 'join')
    .reduce((acc, table) => {
      return (acc += createJoinModel(table, state.tables) + '\n\n');
    }, '');

  const schema = `${tableSchema}
  
  ${joinSchema}
  `;
  // const schema = state.tables.reduce((acc, table) => {
  //   return (acc += createModel(table) + '\n\n');
  // }, '');
  return schema;
};

export default generateSchema;
