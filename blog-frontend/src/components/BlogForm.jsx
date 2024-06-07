import { useDispatch } from "react-redux";
import { useField } from '../hooks/useField'
import { createBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { Box, Button, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send'

const BlogForm = () => {
  const dispatch = useDispatch()

  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const onCreate = (event) => {
    event.preventDefault()

    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value,
      likes: 0
    }

    dispatch(createBlog(newBlog))
    dispatch(setNotification(`Added blog post ${newBlog.title} ${newBlog.author}`, 5, "notification"))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={onCreate}>
        <Box
          sx={{
            '& .MuiTextField-root': { m: 0.25, width: '40ch' },
          }}
          noValidate
          autoComplete="off"
        >
        <div>
          <TextField
            {...title}
            variant="standard"
            required
            label="title"
          />
        </div>
        <div>
          <TextField
            {...author}
            variant="standard"
            required
            label="author"
          />
        </div>
        <div>
          <TextField
            {...url}
            variant="standard"
            required
            label="url"
          />
        </div>
        </Box>
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          color="secondary"
          type="submit"
        >create</Button>
      </form>
    </div>
  );
};

export default BlogForm;
