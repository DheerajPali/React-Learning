import { useCallback, useState } from "react";
import Input from "../components/input";
import { register } from "module";
import axios from "axios";
import {signIn} from 'next-auth/react' 
import { sign } from "crypto";
import { useRouter } from "next/router";

import {FcGoogle} from 'react-icons/fc';
import { FaGithub } from "react-icons/fa";
 
const Auth = () =>{

    const router = useRouter();

    const [email,setEmail] = useState('');
    const [name,setName] = useState('');
    const [password,setPassword] = useState('');

    const [variant,setVariant] = useState('login')

    const toggleVarient = useCallback(()=>{
        setVariant((currentVarient)=> currentVarient ==='login' ? 'register' : 'login');
    },[])


//LOGIN FUNCTION
const login = useCallback(async ()=>{
    try{
    await signIn('credentials',{
        email,
        password,
        redirect:false,
        callbackUrl:'/'
    });
    router.push('/');
    }
    catch(error){
        console.log(error)
    }
},[email,password,router])


//REGISTER FUNCTION 
    const register = useCallback(async()=>{
        try{
            //Make sure the path .. verify it if found any error
            await axios.post('/api/register',{
                email,
                name,
                password
            });
            login();
        }
        catch(error){
            console.log(error)
        }
    },[email,name,password,login]);

    return(
        <div className="relative h-full w-full bg-[url('/Images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
           <div className="bg-black w-full h-full lg:bg-opacity-50">
                <nav className="px-12 py-5">
                    <img src="/images/logo.png" alt="Logo" className="h-12"/>
                </nav>
                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                        <h2 className="text-white text-4xl mb-8 font-semibold">
                          {variant === 'login'? 'Sign in' : 'Register'}
                        </h2>
                        <div className="flex flex-col gap-4">
                            {variant ==='register' && (

                        <Input
                        id="name"
                        type="text"
                        label="Username"
                        onChange={(e:any)=>setName(e.target.value)}
                        value={name}
                        
                        />
                            )}
                        <Input
                        id="email"
                        type="email"
                        label="Email"
                        onChange={(e:any)=>setEmail(e.target.value)}
                        value={email}
                        />
                        <Input
                        id="password"
                        type="password"
                        label="Password"
                        onChange={(e:any)=>setPassword(e.target.value)}
                        value={password}
                        />
                        </div>
                        <button onClick={variant ==='login'? login : register} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
                            {variant ==='login'? 'Login':'Sign up'}
                        </button>
               
                        <div className="flex flex-row items-center gap-4 mt-8 justify-center">
            {/* Google Authentication Icon  */}
                                <div 
                                onClick={()=>signIn('google',{callbackUrl: '/'})}
                                className="
                                w-10
                                h-10
                                bg-white
                                rounded-full
                                flex
                                items-center
                                justify-center
                                cursor-pointer
                                hover:opacity-80
                                transition"
                                >
                                    < FcGoogle size={30}/>
                                </div>
            {/* Github Authentication Icon  */}
                                <div 
                                onClick={()=>signIn('github',{callbackUrl: '/'})}
                                className="
                                w-10
                                h-10
                                bg-white
                                rounded-full
                                flex
                                items-center
                                justify-center
                                cursor-pointer
                                hover:opacity-80
                                transition"
                                >
                                    < FaGithub size={30}/>
                                </div>
                        </div>
                        <p className="text-neutral-500 mt-12">
                            First time using Netflix?
                            <span onClick={toggleVarient} className="text-white ml-1 hover:underline cursor-pointer">
                                Create an account
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth;