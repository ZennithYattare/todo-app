import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import Header from "./components/Header";
import ModalAdd from "./components/ModalAdd";
import ModalEdit from "./components/ModalEdit";
import "./App.css";
import { getAllTodos, editTodo, deleteTodo } from "./services/storage";

function App() {
	const [todos, setTodos] = useState(getAllTodos());
	const [currentTodo, setCurrentTodo] = useState(null);
	const [todoArray, setTodoArray] = useState([]);

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

	const markAsPending = () => {
		// Get the existing todos from localStorage
		const existingTodos = JSON.parse(localStorage.getItem("notes")) || [];

		// Mark all todos in todoArray as pending
		const updatedTodos = existingTodos.map((todo) => {
			if (todoArray.includes(todo.id)) {
				const updatedTodo = {
					...todo,
					updated_at: new Date().toISOString(),
					completed: false,
				};
				editTodo(updatedTodo);
				return updatedTodo;
			} else {
				return todo;
			}
		});

		// Save the updated todos back to localStorage
		localStorage.setItem("notes", JSON.stringify(updatedTodos));

		// Update the state with the updated todos
		setTodos(updatedTodos);

		// Clear todoArray
		setTodoArray([]);
	};

	const markAsDone = () => {
		// Get the existing todos from localStorage
		const existingTodos = JSON.parse(localStorage.getItem("notes")) || [];

		// Mark all todos in todoArray as completed
		const updatedTodos = existingTodos.map((todo) => {
			if (todoArray.includes(todo.id)) {
				const updatedTodo = {
					...todo,
					updated_at: new Date().toISOString(),
					completed: true,
				};
				editTodo(updatedTodo);
				return updatedTodo;
			} else {
				return todo;
			}
		});

		// Save the updated todos back to localStorage
		localStorage.setItem("notes", JSON.stringify(updatedTodos));

		// Update the state with the updated todos
		setTodos(updatedTodos);

		// Clear todoArray
		setTodoArray([]);
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

	console.log("todos: ", todos);

	console.log("todoArray: ", todoArray);

	return (
		<>
			<Header />

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

			<Tabs
				defaultActiveKey="pending"
				id="uncontrolled-tab-example"
				className="mb-3"
			>
				<Tab eventKey="pending" title="Pending">
					<Button
						variant="primary"
						onClick={() => setShowAddModal(true)}
					>
						Add Todo
					</Button>

					<Button variant="success" onClick={markAsDone}>
						Mark as Done
					</Button>
					{todos.map((todo) => {
						if (!todo.completed) {
							return (
								<div key={todo.id}>
									<Form>
										<Form.Check
											type="checkbox"
											label={todo.title}
											onChange={(e) => {
												if (e.target.checked) {
													// If the checkbox is checked, add the todo.id to arrayTodo
													setTodoArray([
														...todoArray,
														todo.id,
													]);
												} else {
													// If the checkbox is unchecked, remove the todo.id from arrayTodo
													setTodoArray(
														todoArray.filter(
															(id) =>
																id !== todo.id
														)
													);
												}
											}}
										/>
									</Form>
									<h3>{todo.title}</h3>
									<p>{todo.description}</p>
									<p>
										{"Due on: "}
										{new Date(
											todo.deadline
										).toLocaleDateString("en-US", {
											year: "numeric",
											month: "long",
											day: "numeric",
										})}
										{" at "}
										{new Date(
											todo.deadline
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
										View/Edit
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
						}
					})}
				</Tab>
				<Tab eventKey="done" title="Done">
					<Button variant="success" onClick={markAsPending}>
						Mark as Pending
					</Button>
					{todos.map((todo) => {
						if (todo.completed) {
							return (
								<div key={todo.id}>
									<Form>
										<Form.Check
											type="checkbox"
											label={todo.title}
											onChange={(e) => {
												if (e.target.checked) {
													// If the checkbox is checked, add the todo.id to arrayTodo
													setTodoArray([
														...todoArray,
														todo.id,
													]);
												} else {
													// If the checkbox is unchecked, remove the todo.id from arrayTodo
													setTodoArray(
														todoArray.filter(
															(id) =>
																id !== todo.id
														)
													);
												}
											}}
										/>
									</Form>
									<h3 className="strike-through">
										{todo.title}
									</h3>
									<p className="strike-through">
										{todo.description}
									</p>
									<p>
										{"Due on: "}
										{new Date(
											todo.deadline
										).toLocaleDateString("en-US", {
											year: "numeric",
											month: "long",
											day: "numeric",
										})}
										{" at "}
										{new Date(
											todo.deadline
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
										View/Edit
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
						}
					})}
				</Tab>
			</Tabs>
		</>
	);
}

export default App;
