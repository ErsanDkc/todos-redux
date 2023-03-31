import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggle, deleteTodo } from "../redux/todos/todosSlice";

function TodoList() {
  const todo = useSelector((state) => state.todos.items);
  const dispatch = useDispatch();
  
  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteTodo({id : id}));
    }
  };
  return (
    <ul className="todo-list">
      {todo.map((item) => (
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
