import { useState } from 'react'
import './App.css'
import TodoSlice from './features/todo/todoSlice'
import AddTodo from './components/AddTodo'
import Todos from './components/Todos'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <AddTodo/>
     <Todos/>
    </>
  )
}

export default App
