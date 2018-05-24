import { GraphQLObjectType, GraphQLString,GraphQLList, GraphQLID, GraphQLNonNull } from 'graphql';


const userType = new GraphQLObjectType({
  name:'User',
  fields:() => (
    {
      _id:{type: GraphQLID},
      name:{type: GraphQLString},
      email:{type: GraphQLString}
    }
  )
})



module.exports = userType;
