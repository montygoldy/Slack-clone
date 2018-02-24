import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import cors from 'cors';
import models from './models';

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
const graphqlEndpount = '/graphql'
app.use(graphqlEndpount, bodyParser.json(), graphqlExpress({ schema, context: {
  models,
  user: {
    id: 1
  },
  SECRET,
  SECRET2,
} }));
app.use('/graphiql', graphiqlExpress({ endpointURL: graphqlEndpount }));
// force: true in syn to drop the table
models.sequelize.sync({}).then(() => {
  app.listen(PORT);
})