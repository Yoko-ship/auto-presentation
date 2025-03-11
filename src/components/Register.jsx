import React from 'react'

function Register() {
  return (
    <div className='form'>
        <form>
            <div className="info">
                <h2>Добро пожаловать</h2>
                <p>Нам нужно собрать некоторую информацию прежде чем начать</p>
            </div>
            <div className='first-sector'>
                <div className='email'>
                    <label>Почта</label>
                    <input type='email'/>
                </div>
                <div className='password'>
                    <label>Пароль</label>
                    <input type='password'/>
                    <label>Подтвердите пароль</label>
                    <input type='password'/>
                </div>
                <hr></hr>
            </div>
        </form>
    </div>
  )
}

export default Register