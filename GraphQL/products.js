const { gql } = require('apollo-server-express');
const db = require('./../database');

const typeDefs = gql`
  type Query {
    products: [Product]
    product(id: ID!): Product
  }
  type Product {
    id: ID!
    name: String!
    color: String!
    price: String!
  }

  type Mutation {
    updateProduct(
      id: Int, 
      name: String, 
      color: String, 
      price: String
    ): String
    createProduct(
      name: String, 
      color: String, 
      price: String
    ): String
    deletProduct(id: Int): Boolean
  }
`

const resolvers = {
  Query: {
    products: async () => db.products.findAll(),
    product: async (obj, args, context, info) =>
      db.products.findByPk(args.id),
  },
  Mutation: {
    createProduct: async (root,args,context,info) => {
      product = await db.products.create({
        name: args.name,
        color: args.color,
        price: args.price,
      });
      return product.id;
    },
    updateProduct: async (root,args,context,info) => {
      if (!args.id) return;
      product = await db.products.update({
        name: args.name,
        color: args.color,
        price: args.price,
      }, {
        where: { id: args.id}
      });
      return 'Update Success!';
    },
    deleteProduct: async (root,args,context,info) => {
      if (!args.id) return;
      product = await db.products.destroy({where: {
        id: args.id
      }})
      return 'Delete success!';
    }
  }
}

module.exports = { typeDefs, resolvers }