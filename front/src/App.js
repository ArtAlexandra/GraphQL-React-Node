import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { GET_ALL_TODOS, GET_ONE_TODO } from "./query/user";
import { CREATE_TODO } from "./mutation/user";
import "./App.scss"
function App() {

  const {data,error, loading, refetch} =useQuery(GET_ALL_TODOS)//, {pollInterval: 500}
  const {data: dataOneTodo,error: errorOneTodo } =useQuery(GET_ONE_TODO, {
    variables:{
      id: 1
    }
  })
  console.log(dataOneTodo)
  const [newTodo] = useMutation(CREATE_TODO)
  const [todos, setTodos] = useState([])
 
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
 
  const [errorInput, setErrorInput] = useState('')

  useEffect(()=>{
    
    if(!loading){
     
      setTodos(data.getAllTodos)
     
    }
   
  }, [data])

  const addTodo = (e) => {
   // e.preventDefault()
    console.log(title)
    console.log(content)
    if(!title.length || !content.length){
      setErrorInput("Error! Сheck the input data");
      
    }
    else{
      setErrorInput('')
    newTodo({
        variables: {
            input: {
                title: title,
                content: content
            }
        }
        
    }).then(({data})=>{
      console.log(data)
      setTitle('')
      setContent('')
      getAll()
    }).catch((error)=>{
      console.log(error)
    })
  }
}
const getAll = () => {
 
  refetch()
}


  return (
          <div className="App">
              <div className="container">
                  <h1>TODO LIST</h1>
                  <div className="main__form"> 
                      <div className="main__form__container">
                          <input value={title} onChange={e => setTitle(e.target.value)} type="text"/>
                          <input value={content} onChange={e => setContent(e.target.value)} type="text"/>
      
                          <button  onClick={addTodo}>Create</button>
                          <p className="main__error">{errorInput}</p>
                      </div>
                  </div>
                  {
                      todos.map((todo)=>{
                      return(
                          <div key={todo.id} className="main__todo">
                              <h3>{todo.title}</h3>
                              <span>{todo.content}</span>
                          </div>
                      )
                      })
                  }
              </div>
          </div>
  );
}

export default App;
