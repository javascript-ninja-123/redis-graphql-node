import { GraphQLObjectType, GraphQLString,GraphQLList, GraphQLID, GraphQLNonNull } from 'graphql';
import userType from './user_type';
import User from '../models/user';

const userMutation = new GraphQLObjectType({
  name:"userMutation",
  fields:{
    addUser:{
      type:userType,
      args:{
        name:{type:GraphQLString},
        email:{type: GraphQLString}
      },
      async resolve(parentValue,{name,email},{client}){
        try{
          const user = new User({name,email});
          return user.save();
        }
        catch(err){
          return err;
        }
      }
    }
  }
})


export default userMutation;
