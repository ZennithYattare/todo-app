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
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [deadline, setDeadline] = useState(new Date());

	useEffect(() => {
		if (todo) {
			setTitle(todo.title);
			setDescription(todo.description);
			setDeadline(todo.deadline);
		}
	}, [todo]);

	const handleEdit = () => {
		const updatedTodo = {
			id: todo.id,
			title: title,
			description: description,
			deadline: deadline,
			updated_at: new Date().toISOString(),
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
				<Modal.Title id="contained-modal-title-vcenter">
					View/Edit To do
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group className="mb-3">
						<Form.Label>Due on</Form.Label>
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
						<Form.Label>Title</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter title"
							autoFocus
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Description</Form.Label>
						<Form.Control
							as="textarea"
							rows={3}
							placeholder="Enter description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</Form.Group>
					<Container>
						<Row>
							<Col>
								{"Created: "}
								{new Date(todo.created_at).toLocaleDateString(
									"en-US",
									{
										year: "numeric",
										month: "long",
										day: "numeric",
									}
								)}
								{" at "}
								{new Date(todo.created_at).toLocaleTimeString(
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
								{new Date(todo.updated_at).toLocaleDateString(
									"en-US",
									{
										year: "numeric",
										month: "long",
										day: "numeric",
									}
								)}
								{" at "}
								{new Date(todo.updated_at).toLocaleTimeString(
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
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="danger" onClick={onHide}>
					Close
				</Button>
				<Button
					variant="success"
					onClick={() => {
						handleEdit();
						onHide();
					}}
				>
					Save
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ModalEdit;
