import mongoose from 'mongoose';
import client from '../redis';

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.exec = function(){
  console.log('about to run QUery')

  // console.log(this.Query());
  console.log(this.mongooseCollection.name)

  return exec.apply(this,arguments);
}
