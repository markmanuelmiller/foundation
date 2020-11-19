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

const asdf = sequelize.define(
  'asdf',
  { field_name: { type: DataTypes.STRING } },
  {}
);

const sd = sequelize.define(
  'sd',
  { field_name: { type: DataTypes.STRING } },
  {}
);

const table_name = sequelize.define(
  'table_name',
  { field_name: { type: DataTypes.STRING } },
  {}
);

const join_table = sequelize.define(
  'join_table',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
  },
  {}
);

asdf.belongsToMany(sd, { through: join_table });
sd.belongsToMany(asdf, { through: join_table });

sequelize.sync();
