import client from '../redis';
import {promisify} from 'util';
client.hget = promisify(client.hget);
client.hset = promisify(client.hset);
client.del = promisify(client.del);
//redis data schema
// key = id => nestedKey(friendList) => value (data)
//key = id => nestedKey(haterList) => value (data)


class cacheCenter{
   constructor({model,id}){
    this.client  = client;
    this.model = model;
    this.id = id;
    this.hashKey = JSON.stringify(id);
    this.key = JSON.stringify(`${this.model.collection.name}-${id}`);
  }
   async fetch(){
    try{
      const cachedUser = await client.hget(this.hashKey,this.key);
      if(cachedUser){
        console.log('this data is from Redis cache');
        return JSON.parse(cachedUser)
      }
      console.log('this data is from mongoDB');
      const result = await this.model.find({userId:this.id});
      await client.hset(this.hashKey,this.key, JSON.stringify(result),'EX', 10);
      return result;
    }
    catch(err){
      return null
    }
  }
  async refreshCacheAndSave(data){
    const newData = new this.model(data);
    const savedData = await newData.save();
    await this.client.del(this.hashKey);
    return savedData;
  }
}

export default cacheCenter;
