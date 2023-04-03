import { createAsyncThunk } from "@reduxjs/toolkit";
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


export const toggleTodosAsync = createAsyncThunk("todos/toggleTodosAsync", async({id,data}) => {
  const res = await axios.patch(`${process.env.REACT_APP_BASE_ENDPOINT}/todos/${id}`, data)

  return res.data
})

export const deleteTodosAsync = createAsyncThunk("todos/deleteTodosAsync", async(id) => {
  await axios.delete(`${process.env.REACT_APP_BASE_ENDPOINT}/todos/${id}`)

  return id
})