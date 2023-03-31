import { createSlice } from "@reduxjs/toolkit";

export const todosSlice = createSlice({
    name: "todos",
    initialState : {
        items : [
            {
                id:"1",
                title:"React Learn",
                completed:false
            },
            {
                id:"2",
                title:"Redux Learn",
                completed: true
            },
            {
                id:"3",
                title:"Watch Mehmet Seven",
                completed:false,

            }
        ],
        activeFilter : "all",
    },
    reducers : {
        addTodo : (state,action) => {
            state.items.push(action.payload)
            localStorage.setItem("todos", JSON.stringify(state.items))
        },
        toggle: (state,action) => {
            const {id} = action.payload
            const item = state.items.find((item) => item.id === id)
            item.completed = !item.completed
        },
        deleteTodo: (state,action) => {
            const {id} = action.payload
            const item = state.items.filter((item) => item.id !== id)
            state.items = item
            localStorage.setItem("todos",JSON.stringify(state.items))
        },
        changeFilter : (state,action) => {
            state.activeFilter = action.payload
        },
        completedDelete: (state,action) => {
            const completedItems = action.payload
            state.items = completedItems
        }
    }
})
export const {addTodo,toggle,deleteTodo,changeFilter,completedDelete} = todosSlice.actions
export default todosSlice.reducer;