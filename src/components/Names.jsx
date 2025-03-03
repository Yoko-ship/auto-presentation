import React, { useEffect } from 'react'
import { useContext } from 'react';
import { PresentContext } from '../store/PresentationContext';
function Names({}) {

    const {setName,setSecondName} = useContext(PresentContext)

  return (
   <div className="names">
    <label>Имя</label>
    <input type="text" placeholder="Имя" onChange={(e) => setName(e.target.value)}/>
    <label>Фамилия</label>
    <input type="text" placeholder="Фамилия" onChange={(e) => setSecondName(e.target.value)}/>
  </div>
  )
}

export default Names