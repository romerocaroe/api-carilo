const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const {fetchGuests,findGuest,createGuest, updateGuest} = require('./guest-service');

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
    id:ID!,
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
    guest(id:ID!):guest
  }
  
  input addressInput {
    street:String,
    number:String,
    floor:String,
    city:String
  }

  input carInput {
    vehicular:String,
    patent:String
  }

  input guestInput {
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
    address:[addressInput],
    passenger:Boolean,
    passangerName:String,
    passangerLastname:String,
    passangerBirthdate:String,
    passangerIdentification:Int,
    mobilePhone:Int!,
    mail:String,
    car:[carInput],
    knowledgeHotel:String
  }

  type Mutation {
    createGuest(input:guestInput):guest
    updateGuest(id:ID, input:guestInput):guest
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    guests: () => fetchGuests(),
    guest: (_,{id}) => {
      return findGuest(id);
    }
  },
  Mutation: {
    createGuest:(_,{input}) => {
      return createGuest(input);
    },
    updateGuest:(_,{id,input}) => {
      return updateGuest(id,input);
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 5008 }, () =>
  console.log('Now browse to http://localhost:5008' + server.graphqlPath)
);