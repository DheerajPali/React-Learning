
import UserContextProvider from './context/UserContextProvider'
import './App.css'
import Login from './components/Login.jsx'
import Profile from './components/Profile.jsx'

function App() {
  return (
    <>
    <UserContextProvider>
      <h2>This is react context API</h2>
      <Login/>
      <Profile/>
    </UserContextProvider>
    </>
  )
}

export default App
