//This is our input text component , we'll use this where we need input field. 
//This component can take props , as per your need.

import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`px-3 py-2 rounded-lg bg-white text-black 
                outline-none focus:bg-gray-50 duration-200 border
                 border-gray-200 w-full ${className}`}
        ref={ref}
        {...props}
        id={id}
      ></input>
    </div>
  );
});

export default Input;

/* The best example of forwardRef hook is that , I'm using same input box in a login page , but my state is not 
defined in that login page , so I've to bring that state into my login page ,for that I'll use forwadRef 
to pass the state. 


You can directly pass the state from one component(page) to another. */