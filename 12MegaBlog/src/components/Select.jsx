//This is select component which provides us options. 

import React, { useId } from "react";

function Select({ options, label, className = "", type, ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full">
      {label && <label htmlFor={id} className=""></label>}
      <select
        {...props}
        className={`px-3 py-2 rounded-lg bg-white text-black 
                outline-none focus:bg-gray-50 duration-200 border
                 border-gray-200 w-full ${className}`}
        id={id}
        ref={ref}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);

/* The best example of forwardRef hook is that , I'm using same input box in a login page , but my state is not 
defined in that login page , so I've to bring that state into my login page ,for that I'll use forwadRef 
to pass the state. 


You can directly pass the state from one component(page) to another. */