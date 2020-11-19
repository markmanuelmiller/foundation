const fs = require('fs');
const path = require('path');

const createFile = (schema) => {
  // let schemaString = schema.reduce((acc, curr) => {
  //   return (acc += curr);
  // }, '');

  console.log(schema);

  const remote = `const sequelize = new Sequelize(
    'postgres://oxtxitiw:9voUSEegLwf5oy5pPgLeHrCQY8UzYIh_@lallah.db.elephantsql.com:5432/oxtxitiw'
  );`;

  const local = `const sequelize = new Sequelize('servicenow', 'admin', 'password', {
    host: 'localhost',
    dialect: 'postgres',
  });`;

  const file = `const Sequelize = require('sequelize');
  const { DataTypes } = require('sequelize');
  
  ${local}
  
  sequelize
    .authenticate()
    .then((res) => {
      console.log('running');
    })
    .catch((err) => console.log(err));
  
  ${schema}

  sequelize.sync();`;

  fs.writeFileSync(path.resolve(__dirname, 'query.js'), file);
};

module.exports = createFile;
