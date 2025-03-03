import React from 'react'
import img from "../assets/Thumbnail-generate.8e2e4605.svg"
import "./css/card.css"
import {useNavigate } from 'react-router-dom'

function Create() {
    const navigate = useNavigate()

    const navigation = () =>{
        navigate("/generate")
    }
  return (
    <div className='card-presentation'>
        <button type='button' className='button-present' tabIndex="4" onClick={navigation}>
            <div className='card-one'>
                <div className='card-top'>
                    <img src={img}></img>
                </div>
                <div className='card-bot'>
                    <div className='card-bot-two'>
                        <h2>Создать</h2>
                        <div className='text'>
                            <div>Создавайте за секунды из простого <br/>текстового запроса</div>
                        </div>
                    </div>
                </div>
            </div>
        </button>
    </div>
  )
}

export default Create