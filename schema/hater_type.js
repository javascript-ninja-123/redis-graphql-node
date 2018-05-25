import { GraphQLObjectType, GraphQLString,GraphQLList, GraphQLID, GraphQLNonNull } from 'graphql';


const haterType = new GraphQLObjectType({
  name:'Hater',
  fields:() => (
    {
      _id:{type: GraphQLID},
      name:{type: GraphQLString},
      email:{type: GraphQLString},
      userId:{type: GraphQLID}
    }
  )
})



module.exports = haterType;
