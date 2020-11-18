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
  
  const incident = sequelize.define('incident', { number: { type: DataTypes.STRING },active: { type: DataTypes.BOOLEAN },ok: { type: DataTypes.INTEGER }, }, {});

  sequelize.sync();