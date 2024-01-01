import { useState } from "react";

function Chai(){
 
    let[counter,setCount] = useState(0)
    const addValue =()=>{
        if(counter<20){

            setCount(++counter)  
            console.log('Value Added , counter = ',counter);     
        }
        else{
            alert('you can not increase value greater than 20')
        }
    }
    const removeValue =()=>{
        if(counter>0){
            setCount(--counter)
            console.log('Value Removed , counter = ',counter); 
        }
        else{
            alert('You can not decrease value less then 0')
        }        
    }
    return(
        <>
            <div>
                <h1>This is my practice counter</h1>
                <h2>Value of counter is {counter}</h2>
                <button onClick={addValue} >Value++ </button>               
                <button onClick={removeValue}>Value--</button>
            </div>
        </>
    )
}

export default Chai