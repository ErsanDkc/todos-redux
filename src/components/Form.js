import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodosAsync } from "../redux/todos/todosSlice";
function Form() {
  const [title, setTitle] = useState("");
  const isLoading = useSelector((state) => state.todos.addTodoIsLoading);

  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(addTodosAsync({ title }));
    setTitle("");
  };
  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", alignItems: "center" }}
    >
      <input
      disabled={isLoading}
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {isLoading && <span style={{ paddingRight: 10 }}>Loading...</span>}
    </form>
  );
}

export default Form;
