import Post from "./Post"

const Posts = ({ posts }) => {

  return (
    <>
      {posts.map(post => (<Post key={post._id} post={post}/>))}
    </>
  )
}

export default Posts