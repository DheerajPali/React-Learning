import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Card from '../Components/Card.jsx'
let some={
  name:'Dheeraj',
  age:15
}

let Arr = [1,2,3]
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App  />
  <Card username="Dheeraj"/>
    <Card username='anup' btnText = "Visit Store"/>
    <Card btnText = "click here"/>
  </React.StrictMode>,
)
