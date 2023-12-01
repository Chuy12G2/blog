import express from "express"
import Post from "../models/post.js"
import User from "../models/user.js"
import { verifyToken } from "../middlewares/auth.js"


const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find({}).populate('author')
    res.status(200).json(posts)
  } catch (error) {
    console.log(error)
  }
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

router.get('/:id', async (req, res) => {
  const id = req.params.id
  const post = await Post.findById(id)

  if (!post) {
    return res.status(404).json({ message: 'Post not found' })
  }

  res.status(200).json(post)
})

router.put('/:id', verifyToken, async (req, res) => {
  const id = req.params.id

  const admin = await User.findOne({ name: 'admin' })
  const post = await Post.findById(id)

  if (!post) {
    return res.status(404).json({ message: 'Post not found' })
  }

  post.title = req.body.title
  post.content = req.body.content
  post.author = admin._id

  await post.save()
  res.status(200).json(post)
})

//add comment
router.post('/:id/comment', async (req, res) => {
  const id = req.params.id
  const post = await Post.findById(id)

  const comment = {
    content: req.body.content,
    name: req.body.name
  }

  if  (!post) {
    return res.status(404).json({ message: 'Post not found' })
  }

  post.comments.push(comment)

  await post.save()

  res.status(201).json(post)
})

router.delete('/:id', verifyToken, async (req, res) => {
  const id = req.params.id
  const post = await Post.findById(id)

  if (!post) {
    return res.status(404).json({ message: 'Post not found' })
  }

  await post.delete()

  res.status(200).json({ message: 'Post deleted' })
})

export default router