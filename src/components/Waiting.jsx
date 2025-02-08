import React, { useEffect, useState } from "react";
import "./css/waiting.css";
import { useNavigate } from "react-router-dom";
function Waiting(props) {
  const navigate = useNavigate();
  const [actions, setActions] = useState("");

  const handleImage = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/waiting?prompt=${encodeURIComponent(
          props.action.slides[0].image
        )}&second=${encodeURIComponent(
          actions.slides[2].image
        )}&third=${encodeURIComponent(
          actions.slides[4].image
        )}&fourth=${encodeURIComponent(actions.slides[6])}`
      );
      const data = await response.json();
      props.setFirstImage(data.imageUrl);
      props.setSecondImage(data.imageUrlSecond);
      props.setThirdImage(data.imageUrlThird);
      props.setFourthImage(data.imageUrlFourth);
      navigate("/present");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    setActions(props.action);
  });

  useEffect(() => {
    console.log(actions);
    if (actions) {
      handleImage();
    }
  }, [actions]);

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
