import React from "react";
import { useEffect } from "react";
import { useFormStatus } from "react-dom";

function Button({dowload}) {
    const {pending} = useFormStatus()

    useEffect(() =>{
        console.log(pending)
    },[pending])
    
  return (
      <button onClick={dowload} disabled={pending}>
        <p>{pending ? "Идет скачивание": "Cкачать"}</p>
      </button>
  );
}

export default Button;
