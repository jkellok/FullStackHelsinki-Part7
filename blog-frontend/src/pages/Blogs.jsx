import { Link } from 'react-router-dom'
import Togglable from '../components/Togglable';
import BlogForm from '../components/BlogForm';
import { useRef } from 'react';
import { Box } from '@mui/material';

const Blogs = ({ blogs }) => {
  const byLikes = (a, b) => b.likes - a.likes
  const blogsToSort = [...blogs]

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const blogFormRef = useRef();

  return (
    <div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      {blogsToSort.sort(byLikes).map((blog) => (
        <Link to={`/blogs/${blog.id}`}>
          <Box
            height={50}
            width="flex"
            my={0.25}
            display="flex"
            alignItems="center"
            paddingLeft={2}
            sx={{ border: '2px solid #00b300', backgroundColor: '#ccffcc' }}
          >
            {blog.title} {blog.author}
          </Box>
          {/* <div style={blogStyle}>{blog.title} {blog.author}</div> */}
        </Link>
      ))}
    </div>
  )
};

export default Blogs