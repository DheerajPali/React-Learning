 import { createSlice, nanoid } from "@reduxjs/toolkit";

 const initialState = {
    todos: [{id:1, text : "Hello Champ"}]
 }


 export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers:{
        addTodo : (state,action)=>{
            const todo = {
                id: nanoid(), 
                text : action.payload,
                isTodoEditable : true
            }

            state.todos.push(todo)
        },
        
        removeTodo: (state,action)=>{
            state.todos = state.todos.filter((todo)=>todo.id !== action.payload)
            state.todos
        },

        updateTodo : (state,action) =>{
            console.log(state.todos),   
           state.todos = state.todos.map((todo)=>todo.id === action.payload.id
            ?{...todo,text:action.payload.text}: todo
            )
            console.log(state.todos)
        }
    }
 })


 export const {addTodo,removeTodo,updateTodo} = todoSlice.actions

 export default todoSlice.reducer;