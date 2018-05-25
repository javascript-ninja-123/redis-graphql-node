import { GraphQLObjectType, GraphQLString,GraphQLList, GraphQLID, GraphQLNonNull } from 'graphql';


const friendType = new GraphQLObjectType({
  name:'Friend',
  fields:() => (
    {
      _id:{type: GraphQLID},
      name:{type: GraphQLString},
      email:{type: GraphQLString},
      userId:{type: GraphQLID}
    }
  )
})



module.exports = friendType;
