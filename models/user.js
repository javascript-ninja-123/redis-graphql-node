import mongoose  from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name:{type:String},
  email:{type:String},
  friends:[
    {
      type:Schema.Types.ObjectId,
      ref:'Friend'
    }
  ],
  haters:[
    {
      type:Schema.Types.ObjectId,
      ref:"Hater"
    }
  ]
});


const User = mongoose.model('User', userSchema);

export default User;
