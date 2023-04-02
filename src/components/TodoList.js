import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggle, deleteTodo,todoItems, getTodosAsync } from "../redux/todos/todosSlice";

function TodoList() {
  const todo = useSelector(todoItems);
  const activeFilter = useSelector((state) => state.todos.activeFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodosAsync())
  },[dispatch])

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteTodo({ id: id }));
    }
  };

  const filtered = todo.filter((item) => {
    if (activeFilter === "all") {
      return item;
    } else if (activeFilter === "completed") {
      return item.completed === true;
    } else {
      return item.completed === false;
    }
  });
  return (
    <ul className="todo-list">
      {filtered.map((item) => (
        <li key={item.id} className={item.completed ? "completed" : ""}>
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              checked={item.completed}
              onChange={() => dispatch(toggle({ id: item.id }))}
            />
            <label>{item.title}</label>
            <button
              className="destroy"
              onClick={() => handleDelete(item.id)}
            ></button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
