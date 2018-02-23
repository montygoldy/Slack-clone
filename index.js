import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from './schema'; //schema for graphql
import resolvers from './resolvers';
import models from './models';
// Combimes them together
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const PORT = 8080;
const app = express();
const graphqlEndpount = '/graphql'
app.use(graphqlEndpount, bodyParser.json(), graphqlExpress({ schema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: graphqlEndpount }));
// force: true in syn to drop the table
models.sequelize.sync({ force: true }).then(() => {
  app.listen(PORT);
})