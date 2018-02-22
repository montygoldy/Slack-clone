import Sequelize from 'sequelize';

const models = {
  User: sequelize['import']('./user')),
  Team: sequelize['import']('./team')),
  Member: sequelize['import']('./member')),
  Message: sequelize['import']('./message')),
  Channel: sequelize['import']('./channel'))
};

const sequelize = new Sequelize('slack', 'postgres', 'postgres');

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;