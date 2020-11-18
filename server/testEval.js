const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  'postgres://oxtxitiw:9voUSEegLwf5oy5pPgLeHrCQY8UzYIh_@lallah.db.elephantsql.com:5432/oxtxitiw'
);

sequelize
  .authenticate()
  .then((res) => {
    console.log('running');
  })
  .catch((err) => console.log(err));

// const Test = sequelize.define('Test', { user: { type: DataTypes.STRING } });
run();
sequelize.sync();

function run() {
  console.log(
    evalCode(
      `Test2 = sequelize.define('Test2', { user: { type: DataTypes.STRING } })`
    )
  );
}

function evalCode(code) {
  // return Function('"use strict"; return (' + code + ')')();
  return Function('"use strict"; return (' + code + ')')();
}
