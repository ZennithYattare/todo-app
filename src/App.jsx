import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";

import { BsListCheck, BsCalendar3 } from "react-icons/bs";
import { IoText } from "react-icons/io5";

import Header from "./components/Header";
import ModalAdd from "./components/ModalAdd";
import ModalEdit from "./components/ModalEdit";
import "./App.css";
import { getAllTodos, editTodo, deleteTodo } from "./services/storage";

function App() {
	// Initialize todos state with a checked property
	const [todos, setTodos] = useState(
		getAllTodos()
			.filter((todo) => !todo.completed)
			.map((todo) => ({ ...todo, checked: false }))
	);
	const [todosDone, setTodosDone] = useState(
		getAllTodos()
			.filter((todo) => todo.completed)
			.map((todo) => ({ ...todo, checked: false }))
	);
	const [currentTodo, setCurrentTodo] = useState(null);
	const [todoArray, setTodoArray] = useState([]);
	const [selectAllChecked, setSelectAllChecked] = useState(false);

	const [showAddModal, setShowAddModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const handleUpdate = (id) => {
		let todoToUpdate = todos.find((todo) => todo.id === id);

		if (!todoToUpdate) {
			todoToUpdate = todosDone.find((todo) => todo.id === id);
		}

		setCurrentTodo(todoToUpdate);
		setShowEditModal(true);
	};

	const handleDelete = () => {
		todoArray.forEach((id) => {
			deleteTodo(id);
		});

		setTodos(
			getAllTodos()
				.filter((todo) => !todo.completed)
				.map((todo) => ({ ...todo, checked: false }))
		);

		setTodosDone(
			getAllTodos()
				.filter((todo) => todo.completed)
				.map((todo) => ({ ...todo, checked: false }))
		);
		setTodoArray([]); // Clear todoArray after deletion

		setSelectAllChecked(false);
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

		// update the state with the updated todosDone
		setTodosDone(
			getAllTodos()
				.filter((todo) => todo.completed)
				.map((todo) => ({ ...todo, checked: false }))
		);

		// Clear todoArray
		setTodoArray([]);

		setSelectAllChecked(false);
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

		// update the state with the updated todosDone
		setTodosDone(
			getAllTodos()
				.filter((todo) => todo.completed)
				.map((todo) => ({ ...todo, checked: false }))
		);

		// Clear todoArray
		setTodoArray([]);

		setSelectAllChecked(false);
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

		setTodosDone(
			getAllTodos()
				.filter((todo) => todo.completed)
				.map((todo) => ({ ...todo, checked: false }))
		);
	};

	const ModalDelete = () => {
		return (
			<Modal
				show={showDeleteModal}
				onHide={() => setShowDeleteModal(false)}
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title className="div-content-header-text">
						Delete To do(s)
					</Modal.Title>
				</Modal.Header>
				<Modal.Body className="modal-label">
					<p>Are you sure you want to delete the to do(s)?</p>
				</Modal.Body>
				<Modal.Footer>
					<Button
						bsPrefix="button-cancel modal-button"
						variant="secondary"
						onClick={() => setShowDeleteModal(false)}
					>
						Cancel
					</Button>
					<Button
						bsPrefix="button-danger modal-button"
						variant="danger"
						onClick={() => {
							handleDelete();
							setShowDeleteModal(false);
						}}
					>
						Delete
					</Button>
				</Modal.Footer>
			</Modal>
		);
	};

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

			<ModalDelete />

			<div className="div-content-header">
				<span>
					<img
						src="lexoffice.png"
						className="div-content-header-img"
					/>
				</span>
				<h2 className="div-content-header-text">To-dos</h2>
			</div>

			<div className="div-content">
				<Tabs
					defaultActiveKey="pending"
					id="uncontrolled-tab-example"
					className="mb-3 tab"
					onSelect={() => {
						setSelectAllChecked(false);

						// Clear the checked state of all todos
						setTodos(
							todos.map((todo) => ({ ...todo, checked: false }))
						);

						// Clear the checked state of all todosDone
						setTodosDone(
							todosDone.map((todo) => ({
								...todo,
								checked: false,
							}))
						);

						// Clear todoArray
						setTodoArray([]);
					}}
				>
					<Tab eventKey="pending" title="Pending">
						<Button
							bsPrefix="button-add button-font"
							onClick={() => setShowAddModal(true)}
						>
							Add To-do
						</Button>

						<Button
							bsPrefix="button-font button-primary"
							variant="success"
							onClick={markAsDone}
							disabled={todoArray.length === 0}
						>
							Mark as Done
						</Button>

						<Button
							bsPrefix="button-font button-danger"
							variant="danger"
							onClick={() => setShowDeleteModal(true)}
							disabled={todoArray.length === 0}
						>
							Delete
						</Button>

						<div style={{ overflow: "auto" }} className="div-table">
							<Table responsive="sm" bordered hover>
								<thead>
									<tr>
										<th
											style={{
												textAlign: "center",
											}}
										>
											<Form.Check
												className="paragraph-font"
												type="checkbox"
												// label="Select All"
												checked={selectAllChecked}
												onChange={(e) => {
													const newCheckedState =
														e.target.checked;
													setSelectAllChecked(
														newCheckedState
													); // Update the selectAllChecked state

													// Update the checked state of all todos
													setTodos(
														todos
															.filter(
																(todo) =>
																	!todo.completed
															)
															.map((todo) => ({
																...todo,
																checked:
																	newCheckedState,
															}))
													);

													if (newCheckedState) {
														// If the checkbox is checked, add the ids of all todos to todoArray
														setTodoArray(
															todos
																.filter(
																	(todo) =>
																		!todo.completed
																)
																.map(
																	(todo) =>
																		todo.id
																)
														);
													} else {
														// If the checkbox is unchecked, clear todoArray
														setTodoArray([]);
													}
												}}
												disabled={
													!todos.some(
														(todo) =>
															!todo.completed
													)
												}
											/>
										</th>
										<th className="table-header-text">
											<IoText className="table-header-icon" />{" "}
											Task name
										</th>
										<th>
											<BsListCheck className="table-header-icon" />{" "}
											Task description
										</th>
										<th>
											<BsCalendar3 className="table-header-icon" />{" "}
											Due
										</th>
									</tr>
								</thead>
								<tbody>
									{todos.some((todo) => !todo.completed) ? (
										todos
											.sort(
												(a, b) =>
													new Date(a.deadline) -
													new Date(b.deadline)
											)
											.map((todo) => {
												if (!todo.completed) {
													return (
														<tr key={todo.id}>
															<td
																style={{
																	textAlign:
																		"center",
																}}
															>
																<Form>
																	<Form.Check
																		type="checkbox"
																		checked={
																			todo.checked
																		} // Bind the checked attribute to the checked property of the todo
																		onChange={(
																			e
																		) => {
																			const updatedTodo =
																				{
																					...todo,
																					checked:
																						e
																							.target
																							.checked,
																				};

																			const updatedTodos =
																				todos.map(
																					(
																						t
																					) =>
																						t.id ===
																						todo.id
																							? updatedTodo
																							: t
																				);

																			setTodos(
																				updatedTodos
																			);

																			if (
																				e
																					.target
																					.checked
																			) {
																				setTodoArray(
																					[
																						...todoArray,
																						todo.id,
																					]
																				);
																			} else {
																				setTodoArray(
																					todoArray.filter(
																						(
																							id
																						) =>
																							id !==
																							todo.id
																					)
																				);
																			}

																			// Check if all todos are checked
																			const allChecked =
																				updatedTodos.every(
																					(
																						todo
																					) =>
																						todo.checked
																				);

																			// If all todos are checked, set selectAllChecked to true
																			// Otherwise, set it to false
																			setSelectAllChecked(
																				allChecked
																			);
																		}}
																	/>
																</Form>
															</td>
															<td
																onClick={() => {
																	if (todo) {
																		handleUpdate(
																			todo.id
																		);
																	}
																}}
															>
																{todo.title}
															</td>
															<td
																className="table-data-description"
																onClick={() => {
																	if (todo) {
																		handleUpdate(
																			todo.id
																		);
																	}
																}}
															>
																{
																	todo.description
																}
															</td>
															<td
																onClick={() => {
																	if (todo) {
																		handleUpdate(
																			todo.id
																		);
																	}
																}}
															>
																{new Date(
																	todo.deadline
																).toLocaleDateString(
																	"en-US",
																	{
																		year: "numeric",
																		month: "long",
																		day: "numeric",
																	}
																)}
																{" at "}
																{new Date(
																	todo.deadline
																).toLocaleTimeString(
																	"en-US",
																	{
																		hour: "2-digit",
																		minute: "2-digit",
																		hour12: true,
																	}
																)}
															</td>
														</tr>
													);
												}
											})
									) : (
										<tr>
											<td colSpan={6}>
												Add to do by clicking the
												&quot;Add To do&quot; button
											</td>
										</tr>
									)}
								</tbody>
							</Table>
						</div>
					</Tab>
					<Tab eventKey="done" title="Done">
						<Button
							bsPrefix="button-font button-primary"
							variant="success"
							onClick={markAsPending}
							disabled={todoArray.length === 0}
						>
							Mark as Pending
						</Button>

						<Button
							bsPrefix="button-font button-danger"
							variant="danger"
							onClick={() => setShowDeleteModal(true)}
							disabled={todoArray.length === 0}
						>
							Delete
						</Button>

						<div style={{ overflow: "auto" }} className="div-table">
							<Table responsive="sm" bordered hover>
								<thead>
									<tr>
										<th
											style={{
												textAlign: "center",
											}}
										>
											<Form.Check
												className="paragraph-font"
												type="checkbox"
												checked={selectAllChecked}
												disabled={
													todosDone.length === 0
												}
												onChange={(e) => {
													const newCheckedState =
														e.target.checked;
													setSelectAllChecked(
														newCheckedState
													); // Update the selectAllChecked state

													// Update the checked state of all todos
													setTodosDone(
														todosDone.map(
															(todo) => ({
																...todo,
																checked:
																	newCheckedState,
															})
														)
													);

													if (newCheckedState) {
														// If the checkbox is checked, add the ids of all todos to todoArray
														setTodoArray(
															todosDone.map(
																(todo) =>
																	todo.id
															)
														);
													} else {
														// If the checkbox is unchecked, clear todoArray
														setTodoArray([]);

														// Clear the checked state of all todos
														setTodosDone(
															todosDone.map(
																(todo) => ({
																	...todo,
																	checked: false,
																})
															)
														);
													}
												}}
											/>
										</th>
										<th className="table-header-text">
											<IoText className="table-header-icon" />{" "}
											Task name
										</th>
										<th>
											<BsListCheck className="table-header-icon" />{" "}
											Task description
										</th>
										<th>
											<BsCalendar3 className="table-header-icon" />{" "}
											Due
										</th>
									</tr>
								</thead>
								<tbody>
									{todosDone.some(
										(todo) => todo.completed
									) ? (
										todosDone
											.sort(
												(a, b) =>
													new Date(a.deadline) -
													new Date(b.deadline)
											)
											.map((todo) => {
												if (todo.completed) {
													return (
														<tr key={todo.id}>
															<td
																style={{
																	textAlign:
																		"center",
																}}
															>
																<Form>
																	<Form.Check
																		type="checkbox"
																		checked={
																			todo.checked
																		}
																		onChange={(
																			e
																		) => {
																			const updatedTodo =
																				{
																					...todo,
																					checked:
																						e
																							.target
																							.checked,
																				};

																			const updatedTodos =
																				todosDone.map(
																					(
																						t
																					) =>
																						t.id ===
																						todo.id
																							? updatedTodo
																							: t
																				);

																			setTodosDone(
																				updatedTodos
																			);

																			if (
																				e
																					.target
																					.checked
																			) {
																				setTodoArray(
																					[
																						...todoArray,
																						todo.id,
																					]
																				);
																			} else {
																				setTodoArray(
																					todoArray.filter(
																						(
																							id
																						) =>
																							id !==
																							todo.id
																					)
																				);
																			}

																			// Check if all todos are checked
																			const allChecked =
																				updatedTodos.every(
																					(
																						todo
																					) =>
																						todo.checked
																				);

																			// If all todos are checked, set selectAllChecked to true
																			// Otherwise, set it to false
																			setSelectAllChecked(
																				allChecked
																			);
																		}}
																	/>
																</Form>
															</td>
															<td
																className="strike-through"
																onClick={() => {
																	if (todo) {
																		handleUpdate(
																			todo.id
																		);
																	}
																}}
															>
																{todo.title}
															</td>
															<td
																className="table-data-description strike-through"
																onClick={() => {
																	if (todo) {
																		handleUpdate(
																			todo.id
																		);
																	}
																}}
															>
																{
																	todo.description
																}
															</td>
															<td
																className="strike-through"
																onClick={() => {
																	if (todo) {
																		handleUpdate(
																			todo.id
																		);
																	}
																}}
															>
																{new Date(
																	todo.deadline
																).toLocaleDateString(
																	"en-US",
																	{
																		year: "numeric",
																		month: "long",
																		day: "numeric",
																	}
																)}
																{" at "}
																{new Date(
																	todo.deadline
																).toLocaleTimeString(
																	"en-US",
																	{
																		hour: "2-digit",
																		minute: "2-digit",
																		hour12: true,
																	}
																)}
															</td>
														</tr>
													);
												}
											})
									) : (
										<tr>
											<td colSpan={6}>
												No tasks done yet
											</td>
										</tr>
									)}
								</tbody>
							</Table>
						</div>
					</Tab>
				</Tabs>
			</div>
		</>
	);
}

export default App;
