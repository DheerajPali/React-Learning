import { useState } from 'react'
import './App.css'

function App() {
  // const [count, setCount] = useState(15);
  let[counter, setCounter] = useState(15)

  // let counter = 5;
  const addValue = () =>{
    console.log('Value Added', Math.random())
    setCounter(counter+1)
  }
  const removeValue = () =>{
    console.log('value decreases', Math.random())
    setCounter(counter-1)
  }
  return (
    <>
      <div>
        <h1>Chai aur React</h1>        
        <h2>Counter value {counter}</h2>
        <div>        
        <button onClick={addValue}
        >+ Value</button>
        <button onClick={removeValue}
        >- Value</button>
        <h2>{counter}</h2>
        </div>       
      </div>
    </>
  )
}

export default App