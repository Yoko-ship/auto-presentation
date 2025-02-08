const express = require("express")
const puppeteer = require("puppeteer")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const { GoogleGenerativeAI } = require("@google/generative-ai")
app.use(cors())
app.use(bodyParser.json())

app.get("/",function(request,response){
    response.send("something")
})

var result;
app.post("/generate", async function(request, response) {
    const prompt = request.body.presentationPrompt;  
    const api_key = "AIzaSyCrj3saz9DtSmuesXjHKLR7HIAxRJD3RrY"
    const genAI = new GoogleGenerativeAI(api_key)
    const model = genAI.getGenerativeModel({model:"gemini-2.0-flash-exp"})
    const question = prompt
    result = await model.generateContent(question)
    response.send(result)
  });


app.get("/waiting",async(req,res) =>{
    const {prompt} = req.query
    const {second} = req.query
    const {third} = req.query
    const {fourth} = req.query
    if (!prompt) return res.status(404).send("Prompt is required")
    const browser = await puppeteer.launch({ headless:true})
    const page = await browser.newPage();
    const secondPage = await browser.newPage();
    const thirdPage = await browser.newPage();
    const fourthPage = await browser.newPage();
    try{
        await page.goto("https://lorastudio.co/generate?model=fofr/sdxl-emoji")
        await secondPage.goto("https://lorastudio.co/generate?model=fofr/sdxl-emoji")
        await thirdPage.goto("https://lorastudio.co/generate?model=fofr/sdxl-emoji")
        await fourthPage.goto("https://lorastudio.co/generate?model=fofr/sdxl-emoji")
        await page.type("textarea",prompt)
        await secondPage.type("textarea",second)
        await thirdPage.type("textarea",third)
        await fourthPage.type("textarea",fourth)
        await page.evaluate(() =>{
            document.querySelector("button.pink.lg")?.click();
        })
        await secondPage.evaluate(() =>{
            document.querySelector("button.pink.lg")?.click();
        })
        await thirdPage.evaluate(() =>{
            document.querySelector("button.pink.lg")?.click();
        })
        await fourthPage.evaluate(() =>{
            document.querySelector("button.pink.lg")?.click();
        })
        await page.waitForSelector("img[alt='Generation']")
        await secondPage.waitForSelector("img[alt='Generation']")
        await thirdPage.waitForSelector("img[alt='Generation']")
        await fourthPage.waitForSelector("img[alt='Generation']")
        const imageUrl = await page.evaluate(() =>{
            const img =  document.querySelector("img[alt='Generation']")
            return img ? img.src : null
        })
        const imageUrlSecond = await secondPage.evaluate(() =>{
            const img = document.querySelector("img[alt='Generation']")
            return img ? img.src : null
        })
        const imageUrlThird = await thirdPage.evaluate(() =>{
            const img = document.querySelector("img[alt='Generation']")
            return img ? img.src : null
        })
        const imageUrlFourth = await fourthPage.evaluate(() =>{
            const img = document.querySelector("img[alt='Generation']")
            return img ? img.src : null
        })
        await browser.close()
        res.json({imageUrl,imageUrlSecond,imageUrlThird,imageUrlFourth})
    }catch(error){
        res.send(error)
        console.log(error)
    }finally{
        await browser.close()
    }
})

  app.listen(3000,() =>{
    console.log("Сервер работает на портe 3000")
})

