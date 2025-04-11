import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Login = ({token,setToken}) => {
    const [name,setName] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');
    const navigate = useNavigate();
   

    const loginHandler = (e) =>{
        e.preventDefault()
        setError('');
        setName('');
        setPassword('');
        axios({
            url: ' https://fakestoreapi.com/auth/login',
            method: 'POST',
            data:{
                username : name,
                password : password,
            },

        })
        .then((res)=>{
            console.log(res.data.token);
            setToken(res.data.token)
            localStorage.setItem('userToken',res.data.token);
            navigate('/products');
            
        })
        .catch((err)=>{
            console.log(err.response);
            setError(err.response.data)
        })
    }

    
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 px-4'>
    <div className='w-full max-w-md bf-white p-6 rounded-2xl shadow-md'>
        <h2 className='text-2xl font-bold text-center text-blue-600 mb-6'>Login</h2>
        <form onSubmit={loginHandler}  className='space-y-4'>
            <div>
                <label className='block text-gray-700'>Username</label>
                <input type='name'
                    className='w-full px-4 py-2 mt-1 border rounded-xl focus:outline-none focus-ring-2 focus:ring-blue-400'
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    required
                    
                />
            </div>
            <div>
                <label className='block text-gray-700'>Password</label>
                <input type='password'
                className='w-full px-4 py-2 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required />
            </div>
            {error && <small>{error}</small>}
            <button type='submit'  className='w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-200'>Login</button>
        </form>

       
        <p className='mt-4 text-xl font-bold text-center text-gray-600'>username:mor_2314 password:83r5^_</p>
    </div>
      
    </div>
  )
}

export default Login
