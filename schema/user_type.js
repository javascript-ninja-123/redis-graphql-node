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
        async resolve({_id},args,{client}){
          const cache = new client({model:Friend,id:_id})
          return cache.fetch()
        }
      },
      haters:{
        type:new GraphQLList(haterType),
        async resolve({_id},args,{client}){
          const cache = new client({model:Hater,id:_id})
          return cache.fetch()
        }
      }
    }
  )
})



module.exports = userType;
