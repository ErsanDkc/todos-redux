import React from "react";
import { useSelector } from "react-redux";

function TodoList() {
  const todo = useSelector((state) => state.todos.items);

  
  return (
    <ul className="todo-list">
      {todo.map((item) => (
        <li key={item.id} className={item.completed ? "completed" : ""}>
          <div className="view">
            <input className="toggle" type="checkbox" />
            <label>{item.title}</label>
            <button className="destroy"></button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
