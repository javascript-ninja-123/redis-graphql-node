import { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLString,GraphQLNonNull } from 'graphql';
import userType from './user_type';
import friendType from './friend_type';
import haterType from './hater_type';
import User from '../models/user';
import Friend from '../models/friends';
import Hater from '../models/haters'

const rootType = new GraphQLObjectType({
  name:'RootType',
  fields:() => (
    {
      getUser:{
        type:userType,
        args:{_id:{type: new GraphQLNonNull(GraphQLID)}},
        async resolve(parentValue,{_id},{client}){
          try{
            const cachedUser = await client.getAsync(_id);
            //if it is cached
            if(cachedUser){
              console.log('serving from cache')
              return JSON.parse(cachedUser)
            }
            //if it is not cached
            console.log('serving from mongodb')
            const user = await User.findById(_id);
            client.set(_id,JSON.stringify(user));
            return user;
          }
          catch(err){
            return null
          }
        }
      },
      getFriend:{
        type:friendType,
        args:{
          _id:{type:new GraphQLNonNull(GraphQLID)}
        },
        async resolve(parentValue,{_id}){
          return await Friend.findById(_id)
        }
      },
      getHater:{
        type:haterType,
        args:{
          _id:{type:new GraphQLNonNull(GraphQLID)}
        },
        async resolve(parentValue,{_id}){
          return await Hater.findById(_id)
        }
      },
    }
  )
})



module.exports = rootType;
