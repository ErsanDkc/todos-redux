import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { changeFilter, completedDelete } from '../redux/todos/todosSlice'

function ContentFooter() {
	const items = useSelector((state) => state.todos.items)
	const leftItem = items.filter((item) => item.completed === false).length
	console.log(leftItem)
	const activeFilter = useSelector((state) => state.todos.activeFilter)
	const dispatch = useDispatch()

	const completedItems = items.filter((item) => !item.completed)


  return (
    <footer className="footer">
		<span className="todo-count">
			<strong>{leftItem} </strong>
			items left
		</span>

		<ul className="filters">
			<li>
				<a href="#/" className={activeFilter === "all" ? "selected" : ""} onClick={() => dispatch(changeFilter("all"))}>All</a>
			</li>
			<li>
				<a href="#/" className={activeFilter === "active" ? "selected" : ""} onClick={() => dispatch(changeFilter("active"))} >Active</a>
			</li>
			<li>
				<a href="#/" className={activeFilter === "completed" ? "selected" : ""} onClick={() => dispatch(changeFilter("completed"))} >Completed</a>
			</li>
		</ul>

		<button className="clear-completed" onClick={() => dispatch(completedDelete(completedItems))}>
			Clear completed
		</button>
	</footer>
  )
}

export default ContentFooter