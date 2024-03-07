/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { editTodo } from "../services/storage";

const ModalEdit = ({ updateTodo, onHide, todo, ...props }) => {
	const [id, setId] = useState("");
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [deadline, setDeadline] = useState("");
	const [created_at, setCreated_at] = useState("");
	const [updated_at, setUpdated_at] = useState("");
	const [completed, setCompleted] = useState(false);

	useEffect(() => {
		if (todo) {
			setId(todo.id);
			setTitle(todo.title);
			setDescription(todo.description);
			setDeadline(todo.deadline);
			setCreated_at(todo.created_at);
			setUpdated_at(todo.updated_at);
			setCompleted(todo.completed);
		}
	}, [todo]);

	const handleEdit = (event) => {
		event.preventDefault();

		onHide();

		const updatedTodo = {
			id: id,
			title: title,
			description: description,
			deadline: deadline,
			created_at: created_at,
			updated_at: new Date().toISOString(),
			completed: completed,
		};

		editTodo(updatedTodo);

		updateTodo(updatedTodo);

		setTitle("");
		setDescription("");
		setDeadline("");
	};

	const handleExit = () => {
		onHide();
	};

	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton onHide={handleExit}>
				<Modal.Title
					id="contained-modal-title-vcenter"
					className="div-content-header-text"
				>
					View/Edit To do
				</Modal.Title>
			</Modal.Header>

			<Form onSubmit={handleEdit} className="paragraph-body-font">
				<Modal.Body>
					<Form.Group className="mb-3">
						<Form.Label className="modal-label">Due on</Form.Label>
						<Form.Control
							type="datetime-local"
							placeholder="Enter due date and time"
							autoFocus
							value={deadline}
							onChange={(e) => {
								setDeadline(e.target.value);
							}}
							required
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label className="modal-label">Title</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter title"
							autoFocus
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							required
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label className="modal-label">
							Description
						</Form.Label>
						<Form.Control
							as="textarea"
							rows={3}
							placeholder="Enter description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							required
						/>
					</Form.Group>
					<Container>
						<Row className="modal-label modal-date">
							<Col>
								{"Created: "}
								{new Date(created_at).toLocaleDateString(
									"en-US",
									{
										year: "numeric",
										month: "long",
										day: "numeric",
									}
								)}
								{" at "}
								{new Date(created_at).toLocaleTimeString(
									"en-US",
									{
										hour: "2-digit",
										minute: "2-digit",
										hour12: true,
									}
								)}
							</Col>
							<Col className="align-right">
								{"Last updated: "}
								{new Date(updated_at).toLocaleDateString(
									"en-US",
									{
										year: "numeric",
										month: "long",
										day: "numeric",
									}
								)}
								{" at "}
								{new Date(updated_at).toLocaleTimeString(
									"en-US",
									{
										hour: "2-digit",
										minute: "2-digit",
										hour12: true,
									}
								)}
							</Col>
						</Row>
					</Container>
					<Modal.Footer>
						<Button
							bsPrefix="button-cancel modal-button"
							variant="danger"
							onClick={onHide}
						>
							Close
						</Button>
						<Button
							bsPrefix="button-primary"
							variant="success"
							type="submit"
						>
							Save
						</Button>
					</Modal.Footer>
				</Modal.Body>
			</Form>
		</Modal>
	);
};

export default ModalEdit;
