import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import graphqlHTTP  from 'express-graphql';
import MyGraphQLSchema from './schema/schema'
//mognoose
import mongoose from 'mongoose';
import './models/user';
import './services/cache';


import client from './redis';
import {MONGO_URL} from './config/secret';
const app = express();

mongoose.connect(MONGO_URL).then(() => console.log('mlab connected'))

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use('/graphql', graphqlHTTP(request => (
  {
    schema: MyGraphQLSchema,
    graphiql: true,
    context:{
      user:request.user,
      client
    }
  }
)));
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', (req,res) => {
  res.send({message:'yes'})
})


app.listen(7000,() => console.log('listening'))
