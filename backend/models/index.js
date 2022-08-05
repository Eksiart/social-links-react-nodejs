const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('social_links', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci', 
    timestamps: true
  },
});

const User = require('./user')(sequelize);

sequelize.authenticate().then(() =>{
  console.log('db connected');
})
  .catch((error) => {
  console.error('db connection error:', error);
})

sequelize.sync({ alter: true }).catch((error) => {
  console.error(error);
})

module.exports = {
  sequelize,
  User,
}