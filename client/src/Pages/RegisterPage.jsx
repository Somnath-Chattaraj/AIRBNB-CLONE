import { useState} from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import React from "react";

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    async function registerUser(ev) {
        ev.preventDefault();
        try {
            await axios.post('/register', {
                name,
                email,
                password,
            });
            alert('Registration successful. Now you can log in.')
        } catch (e) {
            alert('Registration failed. Please try again later.')
        }
        
    }
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-32">
               <h1 className="text-4xl text-center mb-4">Register</h1>
                <form action="" className="max-w-md mx-auto" onSubmit={registerUser}>
                    <input type="text" value={name} onChange={ev => setName(ev.target.value)} placeholder="Jhon Doe" />
                    <input type="email" value={email} onChange={ev => setEmail(ev.target.value)} placeholder="your@email.com" />
                    <input type="password" value={password} onChange={ev => setPassword(ev.target.value)} placeholder="password" />
                    <button className="primary">Register</button>
                    <div className="text-center py-2 text-gray-500">
                        Already a member? <Link className="underline text-bn" to={"/login"}>Login</Link>
                    </div>
                </form> 
            </div>
            
        </div>
    )
}