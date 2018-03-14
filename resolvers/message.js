import requiresAuth from '../permissions';
import { PubSub, withFilter } from 'graphql-subscriptions';

const pubsub = new PubSub()

const NEW_CHANNEL_MESSAGE = 'NEW_CHANNEL_MESSAGE';

export default {
  Subscription: {
    newChannelMessage: {
      subscribe: withFilter(() => pubsub.asyncIterator(NEW_CHANNEL_MESSAGE), (payload, args) => {
         return payload.channelId === args.channelId;
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
        const message = await models.Message.create({ ...args, userId: user.id });
        pubsub.publish(NEW_CHANNEL_MESSAGE, { channelId: args.channenlId, newChannelMessage: message.dataValues});
        return true;
      } catch(err){
        console.log(err);
        return false;
      }
    })
  }
};