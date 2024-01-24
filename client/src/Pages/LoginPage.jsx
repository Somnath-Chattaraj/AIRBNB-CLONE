import { Link, Navigate} from "react-router-dom";
import axios from "axios";
import {UserContext} from "../UserContext.jsx"
import React, { useContext, useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false)
    const {setUser} = useContext(UserContext);
    async function handleLoginSubmit(ev) {
        ev.preventDefault();
        try {
            const {data} = await axios.post('/login', {email, password})
            setUser(data);
            alert('Login successful');

            setRedirect(true);
        } catch (error) {
            alert('Login Failed');
        }
       
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-32">
               <h1 className="text-4xl text-center mb-4">Login</h1>
                <form action="" className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
                    <input type="email" name="" id="" value={email} onChange={ev => setEmail(ev.target.value)} placeholder="your@email.com" />
                    <input type="password" name="" id="" value={password} onChange={ev => setPassword(ev.target.value)} placeholder="password" />
                    <button className="primary">Login</button>
                    <div className="text-center py-2 text-gray-500">
                        Don't have an account yet? <Link className="underline text-bn" to={"/register"}>Register now</Link>
                    </div>
                </form> 
            </div>
            
        </div>
    )
}