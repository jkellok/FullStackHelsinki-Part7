import { useEffect } from "react";
import { useDispatch } from "react-redux";
import blogService from "../services/blogs";
import { likeBlog, removeBlog, initializeBlogs } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import storage from "../services/storage";
import { Button, ThemeProvider, createTheme, Typography } from "@mui/material";
import { lime, orange } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: lime,
    secondary: orange,
  },
});

const Blog = ({ blog }) => {
  const dispatch = useDispatch();

  const updateBlogs = () => {
    blogService.getAll().then((blogs) => {
      dispatch(initializeBlogs(blogs));
    });
  };

  const increaseLikes = () => {
    dispatch(likeBlog(blog));
    dispatch(
      setNotification(
        `Updated likes of blog post ${blog.title} ${blog.author}`,
        5,
        "notification",
      ),
    );
    updateBlogs();
  };

  const deleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog));
      dispatch(
        setNotification(
          `Deleted blog post ${blog.title} ${blog.author}`,
          5,
          "notification",
        ),
      );
    }
  };

  const canRemove = blog.user ? blog.user.username === storage.me() : true;

  return (
    <div className="blog">
      <div className="more-blog-details">
        <ThemeProvider theme={theme}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h4">
            {blog.title} {blog.author}
          </Typography>
          <a href={blog.url}>{blog.url}</a> <br />
          likes {blog.likes}{" "}
          <Button
            onClick={increaseLikes}
            variant="contained"
            color="primary"
            size="small"
          >
            like
          </Button>{" "}
          <br />
          added by {blog.user.name} <br />
          {canRemove && (
            <Button
              onClick={deleteBlog}
              variant="contained"
              color="secondary"
              size="small"
            >
              remove
            </Button>
          )}
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Blog;
