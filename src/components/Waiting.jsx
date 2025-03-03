import React from "react";
import "./css/waiting.css";
function Waiting() {


  
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
