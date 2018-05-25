import mongoose  from 'mongoose';
const Schema = mongoose.Schema;

const haterSchema = new Schema({
  name:{type:String},
  email:{type:String},
  userId:{
      type:Schema.Types.ObjectId,
      ref:'User'
    }
});


const Hater = mongoose.model('Hater', haterSchema);

export default Hater;
