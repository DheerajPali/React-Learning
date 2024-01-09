import React from 'react'
import { Link,NavLink } from 'react-router-dom'
function Header() {
  return (
    <>
    Header Menu :
    <NavLink
    to="/"
    className={({isActive})=>`${isActive?'text-red-700':'text-green-600'}`}
    >
      <button>
        Home
      </button>
    </NavLink>
    <NavLink
    to="/about"
    className={({isActive})=>`${isActive?'text-red-700':'text-green-600'}`}>
      <button>
        About
      </button>
    </NavLink>
      
    </>
  )
}

export default Header