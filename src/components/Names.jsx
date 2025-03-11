import React from 'react'
import { useContext } from 'react';
import { PresentContext } from '../store/PresentationContext';
function Names({}) {

    const {setName,setSecondName} = useContext(PresentContext)

  return (
   <div className="names">
    <input type="text" placeholder="Имя" onChange={(e) => setName(e.target.value)}/>
    <input type="text" placeholder="Фамилия" onChange={(e) => setSecondName(e.target.value)}/>
  </div>
  )
}

export default Names