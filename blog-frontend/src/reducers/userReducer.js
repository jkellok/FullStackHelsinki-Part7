import { createSlice } from "@reduxjs/toolkit";
import storage from '../services/storage'

// store info about signed-in user in redux store

const slice = createSlice({
  name: 'user',
  initialState: {
    userInfo: {},
    username: null,
    token: null
  },
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    getUser(state, action) {
      return state
    }
  }
})

export const { setUser } = slice.actions
export default slice.reducer