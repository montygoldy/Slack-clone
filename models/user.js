import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const User  = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isAlphanumeric: {
          args: true,
          msg: "THe username can only contains letters and numbers"
        },
        len: {
          args: [3, 50],
          msg: "Username needs to be 3 to 50 characters long"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: "Invalid email"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6, 100],
          msg: "Password needs to be minimum 6 characters long"
        }
      }
    }
  },
  {
    hooks: {
      afterValidate: async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 12);
        user.password = hashedPassword;
      }
    }
  });

  User.associate = (models) => {
    User.belongsToMany(models.Team, {
      through: models.Member,
      foreignKey: {
        name: 'userId',
        field: 'user_id',
      }
    });
    // N to M relationship for private members of channel
    User.belongsToMany(models.Channel, {
      through: 'channel_member',
      foreignKey: {
        name: 'userId',
        field: 'user_id',
      }
    });
  };

  return User;
};