import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeComments, createComment } from "../reducers/commentReducer";
import commentService from "../services/comments";
import { setNotification } from "../reducers/notificationReducer";
import {
  Button,
  TextField,
  Box,
  ThemeProvider,
  createTheme,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { lime, orange } from "@mui/material/colors";
import CommentIcon from "@mui/icons-material/Comment";

const theme = createTheme({
  palette: {
    primary: lime,
    secondary: orange,
  },
});

const Comments = ({ blogId }) => {
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    commentService.getAll(blogId).then((comments) => {
      dispatch(initializeComments(comments, blogId));
    });
  }, [dispatch]);

  const commentsToShow = useSelector(({ comments }) => {
    return comments;
  });

  const onPost = (e) => {
    e.preventDefault();
    setComment("");

    const newComment = {
      content: comment,
      blog: blogId,
    };

    dispatch(createComment(newComment));
    dispatch(setNotification(`Added a new comment`, 5, "notification"));
  };

  return (
    <div>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6">
        Comments
      </Typography>
      <ThemeProvider theme={theme}>
        <form onSubmit={onPost}>
          <Box
            sx={{
              "& .MuiTextField-root": { m: 0.25, width: "30ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              variant="outlined"
              label="comment"
            />{" "}
          </Box>
          <Button type="submit" variant="contained">
            add comment
          </Button>
        </form>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <List>
              {commentsToShow.map((c) => (
                <ListItem key={c.id}>
                  <ListItemIcon edge="start">
                    <CommentIcon />
                  </ListItemIcon>
                  <ListItemText>{c.content}</ListItemText>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
};

export default Comments;
