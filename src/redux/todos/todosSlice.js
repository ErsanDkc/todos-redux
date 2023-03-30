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
    },
    reducers : {}
})

export default todosSlice.reducer;