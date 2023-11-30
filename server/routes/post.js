import { Router } from "express"
import Post from "../models/post.js"
import User from "../models/user.js"

const app = Router()

app.get('/', async (req, res) => {
  const posts = await Post.find({})
  res.status(200).json(posts)
})

app.post('/', async (req, res) => {
  const admin = await User.findOne({ name: 'admin' })
  console.log('user', admin);

  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    author: admin._id,
  })

  await post.save()

  res.status(201).json(post)
})


export default app