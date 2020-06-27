const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

//connect to cloud.mongodb.com database
//replace my db string & creds with your own
mongoose
 .connect(
  "mongodb+srv://greg:Lbvjy@250685@cluster0-7o24l.mongodb.net/my-family?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
 )
 .then(() => console.log("Connected to MongoDB Atlas"))
 .catch(err => console.log("Error: ", err.message));


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, ()=>{
    console.log('now listening for requests on port 4000')
})