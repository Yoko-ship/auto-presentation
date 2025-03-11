import React from "react";
import { useState,useEffect} from "react";
import Select from "react-select"



function SelectComponents({option,onChange,...props}) {
    const [customStyles,setCustomStyles] = useState({})
    
     useEffect(() => {
    const updateStyles = () => {
      if (window.innerWidth < 600) {
        setCustomStyles({
          control: (provided) => ({
            ...provided,
            width: "100%",
            minHeight: "50px",
          }),
          menu: (provided) => ({
            ...provided,
            position: "fixed",
            top: "50%", 
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50%", 
            maxWidth: "300px",
            backgroundColor: "#282c34",
            borderRadius: "8px",
            zIndex: 1000,
          }),
        });
      } else {
        setCustomStyles({
          control: (provided) => ({
            ...provided,
            width: "300px",
          }),
          menu: (provided) => ({
            ...provided,
            width: "300px",
          }),
        });
      }
    };

    updateStyles();
    window.addEventListener("resize", updateStyles);
    return () => window.removeEventListener("resize", updateStyles);
  }, []);


  return (
    <Select
      options={option}
      onChange={(e) => onChange(e.value)}
      styles={customStyles}
      {...props}
    ></Select>
  );
}

export default SelectComponents;
