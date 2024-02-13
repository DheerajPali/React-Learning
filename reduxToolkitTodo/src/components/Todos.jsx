import React, { useState } from 'react'
import Todo from './Todo'
import { useDispatch,useSelector } from 'react-redux'
import {removeTodo,updateTodo} from '../features/todo/todoSlice'

function Todos() {
    const todos = useSelector(state => state.todos)
    
    
    
    const  EditHandler = ()=>{
    
    }
      
  return (
    <>
    
    <ul className="list-none">
        {todos.map((todo,index) => (
          <Todo todo={todo} key={index} />
        ))}
      </ul>
    </>
  )
}

export default Todos