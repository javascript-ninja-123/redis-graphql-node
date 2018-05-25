import mongoose  from 'mongoose';
const Schema = mongoose.Schema;

const friendSchema = new Schema({
  name:{type:String},
  email:{type:String},
  userId:{
      type:Schema.Types.ObjectId,
      ref:'User'
    }
});


const Friend = mongoose.model('Friend', friendSchema);

export default Friend;
