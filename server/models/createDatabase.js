const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');

// Option 1: Passing a connection URI
// const sequelize = new Sequelize(
//   '[database URL'
// );

// Local database
const sequelize = new Sequelize(
  '[databasename]',
  '[database username]',
  '[database password',
  {
    host: 'localhost',
    dialect: 'postgres',
  }
);

sequelize
  .authenticate()
  .then((res) => {
    console.log('running');
  })
  .catch((err) => console.log(err));

const User = sequelize.define(
  'user',
  {
    uid: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
  },
  {
    updatedAt: 'updated_at',
    createdAt: 'created_at',
  }
);

// force: true will drop the table if it already exists
// User.sync({ force: true }).then(function () {
//   User.create({
//     first_name: 'Hi',
//     last_name: 'bye',
//   });
//   // Table created
//   return User.create({
//     first_name: 'John',
//     last_name: 'Hancock',
//   });
// });

const Group = sequelize.define(
  'group',
  {
    uid: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    updatedAt: 'updated_at',
    createdAt: 'created_at',
  }
);

// Group.sync({ force: true }).then(function () {
//   Group.create({ name: 'admin' });

//   Group.create({ name: 'user' });
// });

User.belongsToMany(Group, { through: 'UserGroups' });
Group.belongsToMany(User, { through: 'UserGroups' });

sequelize.sync();

function run() {
  eval('2 + 2');
}

function eval(code) {
  return Function('"use strict"; return (' + code + ')')();
}

run();
