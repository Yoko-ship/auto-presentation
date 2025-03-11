import React, { useState } from 'react'
import "./css/authorization.css"

function Login() {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const submitHandler = (e)=>{
        e.preventDefault();

        if(email.includes("@") && password.trim().length > 7){
            console.log('ss')
        }
    }
  return (
    <div className='form' onSubmit={submitHandler}>
        <form>
            <label>Почта</label>
            <input type='email' required onChange={(e) => setEmail(e.target.value)} value={email}/>
            <label>Пароль</label>
            <input type='password' required minLength={8} onChange={(e) => setPassword(e.target.value)} value={password}/>
            <button>Войти</button>

            <div className='register'>
                <a href='#/register'>Регистрация</a>
            </div>
        </form>
    </div>
  )
}

export default Login