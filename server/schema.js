const { gql } = require("apollo-server-express");
const Todo = require("./models/Todo");

const typeDefs = gql`
  type Todo {
    _id: ID!
    title: String!
    description: String!
    completed: Boolean!
  }
  type Query {
    getTodos: [Todo]
    getTodo(id: ID!): Todo
  }
  type Mutation {
    addTodo(title: String!, description: String!): Todo
    updateTodo(title: String!, description: String!): Todo
    deleteTodo(id: ID!): String
    changeTodoStatus(id: ID!): String
  }
`;

const resolvers = {
  Query: {
    getTodos: async (parent, args) => {
      return await Todo.find({});
    },
    getTodo: async (parent, args) => {
      return await Todo.findById(args.id);
    },
  },
  Mutation: {
    addTodo: async (parent, args) => {
      let todo = new Todo({
        title: args.title,
        description: args.description,
      });
      return await todo.save();
    },
    updateTodo: async (parent, args) => {
      if (!args.id) return;
      return await Todo.findOneAndUpdate(
        {
          _id: args.id,
        },
        {
          $set: {
            title: args.title,
            description: args.description,
          },
        },
        { new: true }
      );
    },
    deleteTodo: async (parent, args) => {
      if (!args.id) return;
      await Todo.findByIdAndDelete(args.id);
      return "Todo deleted sucessfully"
    },
    changeTodoStatus: async (parent, args) => {
      const todo = await Todo.findOne({_id: args.id})
      todo.completed = true
      await todo.save()
      return "Todo status changed completely..."
    }
  },
};

module.exports = {
    typeDefs,
    resolvers
}
