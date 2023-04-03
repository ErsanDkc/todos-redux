import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { todoItems } from "../redux/todos/todosSlice";
import {getTodosAsync, deleteTodosAsync, toggleTodosAsync} from "../redux/todos/services"
import Error from "./Error";
import Loading from "./Loading";

function TodoList() {
  const todo = useSelector(todoItems);
  const activeFilter = useSelector((state) => state.todos.activeFilter);
  const error = useSelector((state) => state.todos.error)
  const isLoading = useSelector((state) => state.todos.isLoading)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodosAsync())
  },[dispatch])

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteTodosAsync(id));
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

  if(isLoading) {
    return <Loading />
  }

  if(error) {
    return <Error message={error}/>
  }

  const handleToggle =  async(id,completed) => {
    await dispatch(toggleTodosAsync({id,data:{completed}}))
  }
  return (
    <ul className="todo-list">
      {filtered.map((item) => (
        <li key={item.id} className={item.completed ? "completed" : ""}>
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              checked={item.completed}
              onChange={() => handleToggle(item.id, !item.completed)}
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
