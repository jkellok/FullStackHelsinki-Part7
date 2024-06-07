import { useParams } from "react-router-dom"
import BlogComponent from '../components/Blog'
import Comments from "../components/Comments"

const Blog = ({ blogs, user }) => {
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)
  if (!blog) return null
  if (!user) return null

  return (
    <div>
        <BlogComponent blog={blog} user={user} />
        <Comments blogId={id}/>
    </div>
  )
}

export default Blog