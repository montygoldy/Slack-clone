import requiresAuth from '../permissions';
import { PubSub, withFilter } from 'graphql-subscriptions';

const pubsub = new PubSub()

export default {
  Subscription: {
    commentAdded: {
      subscribe: withFilter(() => pubsub.asyncIterator('commentAdded'), (payload, variables) => {
         return payload.commentAdded.repository_name === variables.repoFullName;
      }),
    }
  },
  Message: {
    user: ({ userId }, args, { models }) => models.User.findOne({ where: {id: userId} }),
  },
  Query: {
    messages: requiresAuth.createResolver(async (parent, {channelId}, {models}) =>
      models.Message.findAll({ order: [['created_at', 'ASC']], where: {channelId} }, {raw: true})),
  },
  Mutation: {
    createMessage: requiresAuth.createResolver(async (parent, args, {models, user}) => {
      try{
        await models.Message.create({ ...args, userId: user.id });
        return true;
      } catch(err){
        console.log(err);
        return false;
      }
    })
  }
};