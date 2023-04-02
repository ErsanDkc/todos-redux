import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTodosAsync = createAsyncThunk(
  "todos/getTodosAsync",
  async () => {
    const res = await axios(`${process.env.REACT_APP_BASE_ENDPOINT}/todos`);
    return  res.data;
  }
);

export const addTodosAsync = createAsyncThunk("todos/addTodosAsync", async(data) => {
  const res = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/todos`, data)
  return res.data
})

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    activeFilter: "all",
    addTodoIsLoading: false,
    addTodoError: null
  },
  reducers: {
    

    toggle: (state, action) => {
      const { id } = action.payload;
      const item = state.items.find((item) => item.id === id);
      item.completed = !item.completed;
    },
    deleteTodo: (state, action) => {
      const { id } = action.payload;
      const item = state.items.filter((item) => item.id !== id);
      state.items = item;
      localStorage.setItem("todos", JSON.stringify(state.items));
    },
    changeFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    completedDelete: (state, action) => {
      const completedItems = action.payload;
      state.items = completedItems;
    },
  },
  extraReducers : (builder) => {
    builder
    //get todos
    .addCase(getTodosAsync.pending, (state,action) => {
      state.isLoading = true
    })
    .addCase(getTodosAsync.fulfilled, (state,action) => {
      state.items = action.payload
      state.isLoading=false
    })
    .addCase(getTodosAsync.rejected, (state,action) => {
      state.isLoading =false
      state.error = action.error.message
    })
    // add todos
    .addCase(addTodosAsync.pending, (state,action) => {
      state.addTodoIsLoading = true
    })
    .addCase(addTodosAsync.fulfilled, (state,action) => {
      state.items.push(action.payload)
      state.addTodoIsLoading = false
    })
    .addCase(addTodosAsync.rejected,(state,action) => {
      state.addTodoIsLoading = false
      state.addTodoError = action.error.message
    })
  }
});

export const todoItems = (state) => state.todos.items;

export const {  toggle, deleteTodo, changeFilter, completedDelete } =
  todosSlice.actions;
export default todosSlice.reducer;
