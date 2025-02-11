import React, { useEffect, useRef } from "react";
import "./css/create_page.css";
import { useState } from "react";
import jsonText from "./test.txt?raw";
import { useNavigate } from "react-router-dom";
import Grid from "./Grid";
import Select from "react-select"


function Create_page({ setAction, setSelectValue }) {
  const backgroundTheme = useRef(1);
  const navigate = useNavigate()
  const [prompt, setPrompt] = useState("");
  const [warning,setWarning] = useState(false)
  const [cardNumbers,setCardNumbers] = useState(8)

  const promptExample = "Управление спортом";
  const promptExample2 = "Бизнес-предложения по запуску нового IT-продукта.";
  const promptExample3 = "Основы машинного обучения";
  const promptExample4 = "Маркетинговая стратегия для нового приложения по доставке еды.";
  const promptExample5 = "Будущее квантовых вычислений";
  const promptExample6 = "Будущее искусственного интеллекта в медицине";
  const promptExample7 = "Цифровая трансформация бизнеса";
  const promptExample8 = "Этика в разработке ИТ-продуктов";


  const BtnHandler = async () => {
    if(prompt){
      setWarning(true)
      const presentationPrompt =
    `Сгенерируй JSON презентацию про ${prompt}.
      Сгенерируй ${cardNumbers} слайдов
      Соблюдай логическую последовательность и структуру повествования. 
      Описание каждого слайда должно быть четким,подробным, информативным и соответствовать его заголовку.От первого лица.Словами человека` +
    jsonText;
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
      navigate("/present")
    } catch (error) {
      console.log(error.message);
      navigate("/error")
    }
    }else{
      setWarning(true)
    }
    
  };

  //* select
  const options = [
    {value: "1",label:<div className="theme1"></div>},
    {value: "2",label:<div className="theme2"></div>},
    {value: "3",label:<div className="theme3"></div>},
    {value: "4",label:<div className="theme4"></div>},
  ]

  const cardOptions = [
    {value: "8",label:<div className="">8 слайдов</div>},
    {value: "10",label:<div className="">10 слайдов</div>},
    {value: "12",label:<div className="">12 слайдов</div>},
  ]


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
          <div className="select-div">
            <Select options={cardOptions} onChange={(e) => setCardNumbers(e.value)}></Select>
          </div>
          <div>
            <div className="themes">
              <h2>Выберите фон</h2>
            </div>
            <div className="select-div">
            <Select options={options} ref={backgroundTheme} onChange={(e) => setSelectValue(e.value)}></Select>
            </div>
          </div>
          <div className="prompt-example">
            <hr aria-orientation="horizontal"></hr>
            <p>Пример запроса</p>
            <hr aria-orientation="horizontal"></hr>
          </div>
          <div className="examples">
            <Grid text={promptExample} click={() => setPrompt(promptExample)}></Grid>
            <Grid text={promptExample2} click={() => setPrompt(promptExample2)}></Grid>
            <Grid text={promptExample3} click={() => setPrompt(promptExample3)}></Grid>
            <Grid text={promptExample4} click={() => setPrompt(promptExample4)}></Grid>
            <Grid text={promptExample5} click={() => setPrompt(promptExample5)}></Grid>
            <Grid text={promptExample6} click={() => setPrompt(promptExample6)}></Grid>
            <Grid text={promptExample7} click={() => setPrompt(promptExample7)}></Grid>
            <Grid text={promptExample8} click={() => setPrompt(promptExample8)}></Grid>
          </div>
          {warning &&(
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
