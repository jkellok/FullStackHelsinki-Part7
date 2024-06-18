import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const slice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    addBlog(state, action) {
      return state.concat(action.payload);
    },
    deleteBlog(state, action) {
      const toDelete = action.payload;
      return state.filter((s) => s.id !== toDelete.id);
    },
    replaceBlog(state, action) {
      const replaced = action.payload;
      return state.map((s) => (s.id === replaced.id ? replaced : s));
    },
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (object) => {
  return async (dispatch) => {
    const blog = await blogService.create(object);
    dispatch(addBlog(blog));
  };
};

export const likeBlog = (object) => {
  const toLike = { ...object, likes: object.likes + 1 };
  return async (dispatch) => {
    const blog = await blogService.update(toLike);
    dispatch(replaceBlog(blog));
  };
};

export const removeBlog = (object) => {
  return async (dispatch) => {
    await blogService.deleteBlog(object.id);
    dispatch(deleteBlog(object));
  };
};

export const { addBlog, like, setBlogs, deleteBlog, replaceBlog } =
  slice.actions;
export default slice.reducer;
