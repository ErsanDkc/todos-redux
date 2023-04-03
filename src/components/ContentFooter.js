import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeFilter, todoItems } from "../redux/todos/todosSlice";
import { deleteTodosAsync } from "../redux/todos/services";

function ContentFooter() {
  const items = useSelector(todoItems);
  const leftItem = items.filter((item) => item.completed === false).length;

  const activeFilter = useSelector((state) => state.todos.activeFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("activeFilter",activeFilter)
  },[activeFilter])

  
  const completedAllDelete = async() => {
    const completed =  items.filter((item) => item.completed);
    completed.map(async(element) => {
      await dispatch(deleteTodosAsync(element.id))
    })
  }

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{leftItem} </strong>
        item{leftItem>1 && "s"} left
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={activeFilter === "all" ? "selected" : ""}
            onClick={() => dispatch(changeFilter("all"))}
          >
            All
          </a>
        </li>
        <li>
          <a
            href="#/"
            className={activeFilter === "active" ? "selected" : ""}
            onClick={() => dispatch(changeFilter("active"))}
          >
            Active
          </a>
        </li>
        <li>
          <a
            href="#/"
            className={activeFilter === "completed" ? "selected" : ""}
            onClick={() => dispatch(changeFilter("completed"))}
          >
            Completed
          </a>
        </li>
      </ul>

      <button
        className="clear-completed"
        onClick={() => completedAllDelete()}
      >
        Clear completed
      </button>
    </footer>
  );
}

export default ContentFooter;
