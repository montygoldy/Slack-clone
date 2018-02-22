import Sequelize from 'sequelize';

const models = {
  user: sequelize['import']('./user')),
  team: sequelize['import']('./team')),
  member: sequelize['import']('./member')),
  message: sequelize['import']('./message')),
  channel: sequelize['import']('./channel'))
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