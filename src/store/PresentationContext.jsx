import React, { useState } from 'react'
import { createContext } from 'react'

export const PresentContext = createContext({
    name:"",
    secondName:"",
    action: "",
    selectedImage: "",
    setName: () => {},
    setSecondName: () => {},
    setAction: () =>{},
    setSelectedImage: () =>{},

})
function PresentationContext({children}) {
    const [name,setName] = useState("")
    const [secondName,setSecondName] = useState("")
    const [action,setAction] = useState("")
    const [selectedImage,setSelectedImage] = useState("")

    const ctxValue = {
        name: name,
        secondName:secondName,
        action: action,
        selectedImage:selectedImage,
        setName: setName,
        setSecondName: setSecondName,
        setAction: setAction,
        setSelectedImage:setSelectedImage

    }
  return (
    <PresentContext value={ctxValue}>
        {children}
    </PresentContext>
  )
}

export default PresentationContext