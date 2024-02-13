import React from 'react'

function Container({children}) {
  //You can write return statement without "( )" if you are returning single line, make sure to ad ;(semicolon) to avoid line breake problems
  return <div className='w-full max-w-7xl mx-auto
  px-4'>{children}</div>;
    
  
}

export default Container