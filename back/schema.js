const {buildSchema} = require('graphql')

const schema = buildSchema(`
    
    type Todo {
        id: ID
        title: String
        content: String
    }
   
    
    input TodoInput {
        id: ID
        title: String!
        content: String!
    }
   
    type Query {
        getAllTodos: [Todo]
        getTodo(id: ID): Todo
    }
    type Mutation {
        createTodo(input: TodoInput): Todo
    }

`)
module.exports = schema