const express = require('express')
const cors = require('cors')
const {graphqlHTTP} = require("express-graphql")
const schema =require('./schema')

const todos = [
    {
        id: 1,
        title: "class reunion",
        content: "the meeting went great"
       
    },
    {
        id: 2,
        title: "opening of a new store",
        content: "a new store has opened in the city center"
       
    },
    {
        id: 3,
        title: "saving a kitten",
        content: "the little kitten was saved. They found a new family for him"
       
    }
   
]

const app = express()
app.use(cors())
const createTodo = (input)=>{
    const id = Date.now()
   
    return{
        id, ...input
    }
}

const root = {
    getAllTodos: ()=>{
        
        return todos
    },
    getTodo: ({id})=>{
        return todos.find(todo =>todo.id==id)
    },
    createTodo: ({input})=>{
        const todo = createTodo(input)
        todos.push(todo)
        return todo
    }
}
app.use('/graphql',graphqlHTTP({
    graphiql: true,
    schema,
    rootValue:root
}))
app.listen(3001, ()=>console.log("Start! OK!"))