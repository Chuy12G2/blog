import '../App.css' 
import { MdOutlineInsertComment } from "react-icons/md"
import { Link } from 'react-router-dom'
const Post = ({ post }) => {

  return (
    <div className='post'>
      <Link to={post._id}>{post.title}</Link>
      <p>{post.author.name}</p>
      <p>{post.content}</p>
      <Link to={post._id}>Read More</Link>
      <div className='post-bottom'>
        <MdOutlineInsertComment />
        <span> Comments {post.comments.length}</span>
      </div>
    </div>
  )
}

export default Post