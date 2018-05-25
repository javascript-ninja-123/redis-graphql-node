import { GraphQLObjectType, GraphQLString,GraphQLList, GraphQLID, GraphQLNonNull } from 'graphql';
import userType from './user_type';
import friendType from './friend_type';
import haterType from './hater_type';
import Friend from '../models/friends';
import Hater from '../models/haters';
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
    },
    addFriend:{
      type:friendType,
      args:{
        name:{type:GraphQLString},
        email:{type: GraphQLString},
        userId:{type: GraphQLID}
      },
      async resolve(parentValue,{name,email,userId}){
        try{
          const friend = new Friend({name,email,userId});
          return friend.save()
        }
        catch(err){
          return null;
        }
      }
    },
    addHater:{
      type:haterType,
      args:{
        name:{type:GraphQLString},
        email:{type: GraphQLString},
        userId:{type: GraphQLID}
      },
      async resolve(parentValue,args){
        try{
          const hater = new Hater(args);
          return hater.save()
        }
        catch(err){
          return null;
        }
      }
    }
  }
})


export default userMutation;
