import express from "express"
import dotenv from "dotenv"

dotenv.configDotenv()

const app = express()

app.get('/', (req, res) => {
  res.send('Home')
})

app.listen(process.env.PORT, () => {
  console.log(`Listening on PORT ${process.env.PORT}`)
})