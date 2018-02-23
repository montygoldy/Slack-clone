import Sequelize from 'sequelize';
const sequelize = new Sequelize('slack', 'postgres', 'postgres', {
  dialect: 'postgres',
  define: {
    underscored: true,
  },
  operatorsAliases: Sequelize.Op,
});
const models = {
  User: sequelize.import('./user'),
  Team: sequelize.import('./team'),
  Message: sequelize.import('./message'),
  Channel: sequelize.import('./channel')
};



Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;