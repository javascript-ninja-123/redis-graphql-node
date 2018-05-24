import {GraphQLSchema} from 'graphql';
import RootQueryType from './rootType';
import mutation from './mutation';


module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation
});
