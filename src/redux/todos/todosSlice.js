import { createSlice } from "@reduxjs/toolkit";
import { addTodosAsync,deleteTodosAsync,toggleTodosAsync,getTodosAsync } from "./services";

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    activeFilter: localStorage.getItem("activeFilter"),
    addTodoIsLoading: false,
    addTodoError: null
  },
  reducers: {
    

    
   
    changeFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    // completedDelete: (state, action) => {
    //   const completedItems = action.payload;
    //   state.items = completedItems;
      
    // },
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
      localStorage.setItem("Todos",JSON.stringify(state.items))
      state.addTodoIsLoading = false
    })
    .addCase(addTodosAsync.rejected,(state,action) => {
      state.addTodoIsLoading = false
      state.addTodoError = action.error.message
    })
    //toggle Todo
    .addCase(toggleTodosAsync.pending,(state,action) => {})
    .addCase(toggleTodosAsync.fulfilled,(state,action) =>  {
      console.log(action.payload)
      const {id,completed} = action.payload
      const index = state.items.findIndex((item) => item.id === id)
      state.items[index].completed = completed
    })
    //delete Todo
    .addCase(deleteTodosAsync.pending,(state,action) => {})
    .addCase(deleteTodosAsync.fulfilled,(state,action) => {
      console.log(action.payload)
      // const id = action.payload
      // const index = state.items.findIndex((item) => item.id === id)
      // state.items.splice(index,1)
      // localStorage.setItem("Todos",JSON.stringify(state.items))
      const id = action.payload
      const filtered  = state.items.filter((item) => item.id !== id)
      state.items = filtered
      localStorage.setItem("Todos",JSON.stringify(filtered))
    })
  }
});

export const todoItems = (state) => state.todos.items;

export const {  changeFilter, completedDelete } =
  todosSlice.actions;
export default todosSlice.reducer;
