const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const dotenv = require("dotenv/config")
const { GoogleGenerativeAI } = require("@google/generative-ai")
app.use(cors())
app.use(bodyParser.json())
const port = process.env.PORT


app.post("/generate", async function(request, response) {
    const prompt = request.body.presentationPrompt;
    const api_key = process.env.APIKEY
    const genAI = new GoogleGenerativeAI(api_key)
    const model = genAI.getGenerativeModel({model:"gemini-2.0-flash-exp"})
    const question = prompt
    const result = await model.generateContent(question)
    response.send(result)
  });


  app.listen(port,() =>{
    console.log("Сервер работает на портe 3000")
})

