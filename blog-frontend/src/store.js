import { configureStore } from "@reduxjs/toolkit";
import blogReducer from './reducers/blogReducer'
import notificationReducer from "./reducers/notificationReducer";
import userReducer from './reducers/userReducer'
import commentReducer from './reducers/commentReducer'

export default configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    user: userReducer,
    comments: commentReducer
  }
})