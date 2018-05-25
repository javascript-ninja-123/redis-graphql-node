import { GraphQLObjectType, GraphQLString,GraphQLList, GraphQLID, GraphQLNonNull } from 'graphql';
import friendType from './friend_type';
import Friend from '../models/friends';
import haterType from './hater_type';
import Hater from '../models/haters';

const userType = new GraphQLObjectType({
  name:'User',
  fields:() => (
    {
      _id:{type: GraphQLID},
      name:{type: GraphQLString},
      email:{type: GraphQLString},
      friends:{
        type:new GraphQLList(friendType),
        async resolve({_id},args){
          const res = await Friend.find({userId:_id})
          return res;
        }
      },
      haters:{
        type:new GraphQLList(haterType),
        async resolve({_id},args){
          return await Hater.find({userId:_id})
        }
      }
    }
  )
})



module.exports = userType;
