import React from 'react'
import {useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect,useState } from 'react'




export default function Protected({children,authentication=true})
{
    const navigate = useNavigate()
    const [loader,setLoader] = useState(true)
    //Check issue in state.auth.status
    const authStatus = useSelector(state=>state.auth.status)

    useEffect(()=>{
        //Todo: make if , else if condition more easy with good logic. #Rewrite
        
        // if(authStatus === true){
        //     navigate("/")
        // }
        // else if(authStatus === false){
        //     navigate("/login")
        // }

        //YOU CAN DO IT BY USING A VARIABLE..
        //  let authValue = authStatus === true ? true:false
        //THEN COMPARE VALUE WITH authValue

        if(authentication && authStatus !== authentication){
            navigate("/login")
        }
        else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoader(false)
    },[authStatus,navigate,authentication])
    
  return loader ? <h1>Loading...</h1> : <>{children}</>
}

