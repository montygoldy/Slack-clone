import bcrypt from 'bcrypt';
import _ from 'lodash';
import { tryLogin } from '../auth';

//For formatting the errors

const formatErrors = (e, models) => {
  if (e instanceof models.sequelize.ValidationError) {
    //  _.pick({a: 1, b: 2}, 'a') => {a: 1}
    return e.errors.map(x => _.pick(x, ['path', 'message']));
  }
  return [{ path: 'name', message: 'something went wrong' }];
};

export default {
  Query: {
    getUser: (parent, {id}, {models}) => models.User.findOne({ where: {id}}),
    allUsers: (parent, args, {models}) => models.User.findAll(),
  },
  Mutation: {
    login: (parent, { email, password }, {models, SECRET, SECRET2}) =>  tryLogin(email, password, models, SECRET),

    register: async (parent, {password, ...otherArgs}, {models}) => {
      try{
        if(password.length > 6 || password.lenght < 100){
          const hashedPassword  = await bcrypt.hash(password, 12);
          const user = await models.User.create({ ...otherArgs, password: hashedPassword });
          return {
            ok: true,
            user,
          }
        } else{
          return {
            ok: false,
            errors: [{path: 'password', message: 'Password needs to be 6 and 100 characters long'}]
          }
        }
      } catch(err){
        return {
          ok: false,
          errors: formatErrors(err, models)
        }
      }
    }
  }
};