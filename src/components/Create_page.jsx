import React, { useRef, useState } from "react";
import "./css/create_page.css";
import jsonText from "./prompt.txt?raw";
import { useNavigate } from "react-router-dom";
import firstImage from "../assets/23_afcas12.jpg";
import secondImage from "../assets/59276.jpg";
import thirdImage from "../assets/patrick-tomasso-QMDap1TAu0g-unsplash.jpg";
import fourthImage from "../assets/v915-wit-010-a.jpg";
import Names from "./Names";
import { PresentContext } from "../store/PresentationContext";
import { useContext } from "react";
import SelectComponents from "./SelectComponents";
import { cardOptions } from "./options.js";
import { textManners } from "./options.js";

function Create_page() {
  const backgroundTheme = useRef(1);
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [warning, setWarning] = useState(false);
  const [cardNumbers, setCardNumbers] = useState(8);
  const [manners, setManners] = useState("Простыми словами");
  const { setAction, setSelectedImage } = useContext(PresentContext);

  const BtnHandler = async () => {
    if (prompt) {
      setWarning(true);
      const presentationPrompt =
        `Сгенерируй JSON презентацию про ${prompt}.
      Сгенерируй ${cardNumbers} слайдов
      Соблюдай логическую последовательность и структуру повествования. 
      Описание каждого слайда должно быть четким,подробным, информативным и соответствовать его заголовку.От первого лица.${manners}` +
        jsonText;
      setPrompt("");
      navigate("/waiting");
      try {
        const response = await fetch(
          "https://auto-presentation.onrender.com/generate",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ presentationPrompt }),
          }
        );
        const json = await response.json();
        const text = json.response.candidates[0].content.parts[0].text.trim();
        const cleanedText = text
          .replace(/^```json\n/, "")
          .replace(/\n```$/, "")
          .replaceAll("*", "");
        const jsonText = JSON.parse(cleanedText);
        setAction(jsonText);
        navigate("/present");
      } catch (error) {
        console.log(error.message);
        navigate("/error");
      }
    } else {
      setWarning(true);
    }
  };

  const options = [
    {
      value: "1",
      label: (
        <div className="theme">
          <img src={firstImage}></img>
        </div>
      ),
    },
    {
      value: "2",
      label: (
        <div className="theme">
          <img src={secondImage}></img>
        </div>
      ),
    },
    {
      value: "3",
      label: (
        <div className="theme">
          <img src={thirdImage}></img>
        </div>
      ),
    },
    {
      value: "4",
      label: (
        <div className="theme">
          <img src={fourthImage}></img>
        </div>
      ),
    },
  ];


  return (
    <>
      <div className="container">
        <div className="widgets">
          <div className="name">
            <h2>Генерировать</h2>
          </div>
          <div className="select-div">
            <SelectComponents
              option={cardOptions}
              onChange={setCardNumbers}
              placeholder="Слайды"
            />
            <SelectComponents
              option={textManners}
              onChange={setManners}
              placeholder="Текст"
            />
          </div>
          <Names />
          <div>
            <div className="themes">
              <h2>Выберите фон</h2>
            </div>
            <div className="select-div">
              <SelectComponents
                option={options}
                onChange={setSelectedImage}
                placeholder="Фон"
                ref={backgroundTheme}
              />
            </div>
          </div>
          {warning && (
            <div className="warning">
              <p>Пожалуста напишите тему</p>
            </div>
          )}
          <div className="input-div">
            <input
              type="text"
              placeholder="Опишите что вы хотите создать"
              onChange={(e) => setPrompt(e.target.value)}
              name="name"
              value={prompt}
              required
            />
            <div className="div-btn">
              <button onClick={BtnHandler} type="button">
                Генерировать
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Create_page;
