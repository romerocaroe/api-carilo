const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
let guests = require('./guests.json')

const typeDefs = gql`
  type address {
    street:String,
    number:String,
    floor:String,
    city:String
  }
  type car {
    vehicular:String,
    patent:String
  }
  type guest {
    _id:ID!,
    codpax:Int,
    house:Int,
    lastname:String!,
    name:String!,
    typeIdentification:String!,
    identification:Int!,
    nationality:String,
    birthdate:String,
    maritalStatus:String,
    profession:String,
    address:[address],
    passenger:Boolean,
    passangerName:String,
    passangerLastname:String,
    passangerBirthdate:String,
    passangerIdentification:Int,
    mobilePhone:Int!,
    mail:String,
    car:[car],
    knowledgeHotel:String
  }
  type Query {
    hello: String
    guests: [guest]
    guest(_id:ID!):guest
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    guests: () => guests,
    guest: (_,{_id}) => {
      return guests.find(guest => guest._id == _id)
    }
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 5008 }, () =>
  console.log('Now browse to http://localhost:5008' + server.graphqlPath)
);