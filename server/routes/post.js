import express from "express"
import Post from "../models/post.js"
import User from "../models/user.js"
import { verifyToken } from "../middlewares/auth.js"

const router = express.Router()

router.get('/', async (req, res) => {
  const posts = await Post.find({})
  res.status(200).json(posts)
})


router.post('/', verifyToken, async (req, res) => {
  const admin = await User.findOne({ name: 'admin' })

  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    author: admin._id,
  })

  await post.save()
  res.status(201).json(post)
})


router.put('/post/:id', verifyToken, async (req, res) => {
  const id = req.params.id

  const admin = await User.findOne({ name: 'admin' })
  const post = await Post.findById(id)

  post.title = req.body.title
  post.content = req.body.content
  post.author = admin._id

  await post.save()
  res.status(200).json(post)
})


export default router