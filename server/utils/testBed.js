const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');

const sequelize = new Sequelize('servicenow', 'admin', 'password', {
  host: 'localhost',
  dialect: 'postgres',
});

sequelize
  .authenticate()
  .then((res) => {
    console.log('running');
  })
  .catch((err) => console.log(err));

// MODEL BELOW
const User = sequelize.define(
  'User',
  {
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: 'Users name',
    },
    age: { type: DataTypes.INTEGER, defaultValue: '5' },
  },
  {}
);

const Group = sequelize.define(
  'Group',
  { name: { type: DataTypes.STRING, allowNull: false, unique: true } },
  {}
);

// MODEL ABOVE

// POPULATE TABLES BELOW
User.create({});
User.create({
  firstName: 'mark',
  age: 23,
});

Group.create({});

Group.create({
  name: 'admin',
});
Group.create({
  name: 'admin',
});
// POPULATE TABLES ABOVE

const UserGroups = sequelize.define('UserGroups', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
});

User.belongsToMany(Group, { through: UserGroups });
Group.belongsToMany(User, { through: UserGroups });

sequelize.sync();
