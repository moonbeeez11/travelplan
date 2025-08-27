import { loginUser, registerUser } from '@/api/auth';
import { Button } from '@/components/ui/button';
import useAuth from '@/hooks/useAuth';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const  {login}  = useAuth();
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const form = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
        }
      const response = await registerUser(form);
      console.log(response);
    //   login({ email: form.email }, token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Signup failed");
    }
  };
  return (
    <div>
        <form>
        <input id='name' type="text" placeholder='name' />
        <input id='email' type="email" placeholder='email' />
        <input id='password' type="password" placeholder='password' />

        <Button onClick={handleSubmit}>Signup</Button>
        </form>

    </div>
  )
}

export default Login