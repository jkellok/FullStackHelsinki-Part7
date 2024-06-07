import { createSlice } from '@reduxjs/toolkit'
import commentService from '../services/comments'

const slice = createSlice({
  name: 'comments',
  initialState: [],
  reducers: {
    setComments(state, action) {
      console.log("setcomments state", state)
      return action.payload
    },
    addComment(state, action) {
        console.log("in addcomment state", state, action)
      return state.concat(action.payload)
    }
  }
})

export const initializeComments = (c, blogId) => {
  return async dispatch => {
    const comments = await commentService.getAll(blogId)
    dispatch(setComments(comments))
  }
}

export const createComment = (object) => {
  return async dispatch => {
    const comment = await commentService.create(object)
    dispatch(addComment(comment))
  }
}

export const { addComment, setComments } = slice.actions
export default slice.reducer