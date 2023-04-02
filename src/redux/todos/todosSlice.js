import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTodosAsync = createAsyncThunk(
  "todos/getTodosAsync",
  async () => {
    const res = await axios("http://localhost:7000/todos");
    return await res.data;
  }
);

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    activeFilter: "all",
  },
  reducers: {
    addTodo: {
      reducer: (state, action) => {
        state.items.push(action.payload);
        localStorage.setItem("todos", JSON.stringify(state.items));
      },
      prepare: ({ title }) => {
        return {
          payload: { id: nanoid(), completed: false, title },
        };
      },
    },

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
  }
});

export const todoItems = (state) => state.todos.items;

export const { addTodo, toggle, deleteTodo, changeFilter, completedDelete } =
  todosSlice.actions;
export default todosSlice.reducer;
