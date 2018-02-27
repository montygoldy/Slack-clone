import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import cors from 'cors';
import models from './models';
import { refreshTokens } from './auth';

// Secret for hwt tokens

const SECRET = 'thisisasecretkey';
const SECRET2 = 'thisisasecondsecretkey';

// Defining a type array and feeding the schema folder
const types = fileLoader(path.join(__dirname, './schema'));
const typeDefs = mergeTypes(types);

// Defining a resolver array and feeding the resolvers folder
const resolver = fileLoader(path.join(__dirname, './resolvers'));
const resolvers = mergeResolvers(resolver);


// Combimes them together
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const PORT = 8080;
const app = express();
app.use(cors('*'));

const addUser = async (req, res, next) => {
  const token = req.headers['x-token'];
  if (token) {
    try {
      const { user } = jwt.verify(token, SECRET);
      req.user = user;
    } catch (err) {
      const refreshToken = req.headers['x-refresh-token'];
      const newTokens = await refreshTokens(token, refreshToken, models, SECRET, SECRET2);
      if (newTokens.token && newTokens.refreshToken) {
        res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token');
        res.set('x-token', newTokens.token);
        res.set('x-refresh-token', newTokens.refreshToken);
      }
      req.user = newTokens.user;
    }
  }
  next();
};

app.use(addUser);


const graphqlEndpount = '/graphql'
app.use(graphqlEndpount, bodyParser.json(), graphqlExpress(req => ({ schema, context: {
  models,
  user: req.user,
  SECRET,
  SECRET2,
} }))
);
app.use('/graphiql', graphiqlExpress({ endpointURL: graphqlEndpount }));
// force: true in syn to drop the table
models.sequelize.sync().then(() => {
  app.listen(PORT);
})