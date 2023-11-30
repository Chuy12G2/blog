import express from "express"
import dotenv from "dotenv"
import mongoose, { mongo } from "mongoose"
// import User from "./models/user.js"
// import Post from "./models/post.js"
import postRouter from "./routes/post.js"

dotenv.configDotenv()

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Home')
})

app.use('/post', postRouter)


mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('connected to database')
  // const admin = new User({
  //   name: 'admin',
  //   email: 'admin',
  //   password: 'admin'
  // })
  
  // await admin.save()
  // const author = await User.findById('6568c2f8758ef6b4f828ffc4') 

  // const post  = new Post({
  //   title: 'test3',
  //   content: 'test3',
  //   author: author._id,
  //   comments: [],
  // })

  // await post.save() 
  // console.log(post);
})
.catch((err) => {
  console.log(err)
})

app.listen(process.env.PORT, () => {
  console.log(`Listening on PORT ${process.env.PORT}`)
})