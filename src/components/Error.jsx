import React from 'react'
import { Link } from 'react-router-dom'

function Error() {
  return (
    <div className='main'>
        <div className='error'>
            <h2>Произошла ошибка.Пожалуста попробуйте ещё раз</h2>
            <div className='hint'>
                <Link to="/" className='link'>Создать презентацию</Link>
            </div>
        </div>
    </div>
  )
}

export default Error