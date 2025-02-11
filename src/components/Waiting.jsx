import React, { useEffect, useState } from "react";
import "./css/waiting.css";
import { useNavigate } from "react-router-dom";
function Waiting(props) {


  
  return (
    <>
      <div className="loader">
        <div>
          <p>
          Пожалуйста, подождите несколько секунд, пока загружается презентация.<br/>
          Не закрывайте страницу до завершения процесса.
          </p>
        </div>
      </div>
    </>
  );
}

export default Waiting;
