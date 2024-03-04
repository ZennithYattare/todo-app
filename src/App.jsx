import { useState } from "react";
import Button from "react-bootstrap/Button";

import Header from "./components/Header";
import ModalAdd from "./components/ModalAdd";
import ModalEdit from "./components/ModalEdit";
import "./App.css";
import { getAllTodos, deleteTodo } from "./services/storage";

function App() {
	const [todos, setTodos] = useState(getAllTodos());
	const [currentTodo, setCurrentTodo] = useState(null);

	const [showAddModal, setShowAddModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);

	const handleUpdate = (id) => {
		const todoToUpdate = todos.find((todo) => todo.id === id);
		setCurrentTodo(todoToUpdate);
		setShowEditModal(true);
	};

	const handleDelete = (id) => {
		deleteTodo(id);

		setTodos(getAllTodos());
	};

	// NOTE: Rerender the todos when the todos state changes, such as when a new todo is added
	const addTodo = (todo) => {
		setTodos((prevTodos) => [...prevTodos, todo]);
	};

	const updateTodo = (updatedTodo) => {
		setTodos((prevTodos) =>
			prevTodos.map((todo) =>
				todo.id === updatedTodo.id ? updatedTodo : todo
			)
		);
	};

	console.log(todos);

	return (
		<>
			<Header />

			<Button variant="primary" onClick={() => setShowAddModal(true)}>
				Add Todo
			</Button>

			<ModalAdd
				addTodo={addTodo}
				show={showAddModal}
				onHide={() => setShowAddModal(false)}
			/>

			<ModalEdit
				updateTodo={updateTodo}
				todo={currentTodo}
				show={showEditModal}
				onHide={() => setShowEditModal(false)}
			/>

			<div className="">
				{todos.map((todo) => {
					if (todo) {
						return (
							<div key={todo.id}>
								<h4>{todo.id}</h4>
								<h3>{todo.title}</h3>
								<p>{todo.description}</p>
								<p>
									{"Deadline: "}
									{new Date(todo.deadline).toLocaleDateString(
										"en-US",
										{
											year: "numeric",
											month: "long",
											day: "numeric",
										}
									)}
									{" at "}
									{new Date(todo.deadline).toLocaleTimeString(
										"en-US",
										{
											hour: "2-digit",
											minute: "2-digit",
											hour12: true,
										}
									)}
								</p>
								<p>
									{"Created: "}
									{new Date(
										todo.created_at
									).toLocaleDateString("en-US", {
										year: "numeric",
										month: "long",
										day: "numeric",
									})}
									{" at "}
									{new Date(
										todo.created_at
									).toLocaleTimeString("en-US", {
										hour: "2-digit",
										minute: "2-digit",
										hour12: true,
									})}
								</p>
								<p>
									{"Updated: "}
									{new Date(
										todo.updated_at
									).toLocaleDateString("en-US", {
										year: "numeric",
										month: "long",
										day: "numeric",
									})}
									{" at "}
									{new Date(
										todo.updated_at
									).toLocaleTimeString("en-US", {
										hour: "2-digit",
										minute: "2-digit",
										hour12: true,
									})}
								</p>
								<Button
									variant="primary"
									onClick={() => {
										if (todo) {
											handleUpdate(todo.id);
										}
									}}
								>
									Update
								</Button>
								<Button
									variant="danger"
									onClick={() => {
										if (todo) {
											handleDelete(todo.id);
										}
									}}
								>
									Delete
								</Button>
							</div>
						);
					} else {
						return null;
					}
				})}
			</div>
		</>
	);
}

export default App;
