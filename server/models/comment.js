import mongoose from "mongoose"

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  }
},
  {
    timestamps: true
})

const Comment = mongoose.Schema("Comment", commentSchema)

export default Comment