import React, { useEffect } from "react";
import "./css/create_page.css";
import { useState } from "react";
import jsonText from "./test.txt?raw";
import { useNavigate } from "react-router-dom";

function Create_page({ setAction }) {
  const navigate = useNavigate()
  const [prompt, setPrompt] = useState("");
  const presentationPrompt =
    `Сгенерируй JSON презентацию про ${prompt}.
  Сгенерируй 8 слайдов
  Соблюдай логическую последовательность и структуру повествования. 
  Описание каждого слайда должно быть четким,подробным, информативным и соответствовать его заголовку.От первого лица.Словами человека` +
    jsonText;


  const BtnHandler = async () => {
    setPrompt("")
    navigate("/waiting")
    try {
      const response = await fetch("http://localhost:3000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ presentationPrompt }),
      });
      const json = await response.json();
      const text = json.response.candidates[0].content.parts[0].text.trim();
      const cleanedText = text.replace(/^```json\n/, "").replace(/\n```$/, "");
      const jsonText = JSON.parse(cleanedText);
      setAction(jsonText);
    } catch (error) {
      console.log(error.message);
    }
  };


  return (
    <>
      <div className="container">
        <div className="widgets">
          <div className="name">
            <h2>Генерировать</h2>
            <div className="information">
              <p>Что хотите создать прямо сейчас</p>
            </div>
          </div>
          <div className="input-div">
            <input
              type="text"
              placeholder="Опишите что вы хотите создать"
              onChange={(e) => setPrompt(e.target.value)}
              name="name"
              value={prompt}
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
