import { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLString,GraphQLNonNull } from 'graphql';
import userType from './user_type';
import User from '../models/user';

const rootType = new GraphQLObjectType({
  name:'RootType',
  fields:() => (
    {
      getUser:{
        type:userType,
        args:{_id:{type: new GraphQLNonNull(GraphQLID)}},
        async resolve(parentValue,{id},{client}){
          try{
            const cachedUser = await client.getAsync(id);
            //if it is cached
            if(cachedUser){
              return JSON.parse(cachedUser)
            }
            //if it is not cached
            console.log('serving from mongodb')
            const user = await User.findById(id);
            client.set(id,JSON.stringify(user));
            return user;
          }
          catch(err){
            return null
          }
        }
      },
      getUsers:{
        type: new GraphQLList(userType),
        resolve(){

        }
      }
    }
  )
})



module.exports = rootType;
