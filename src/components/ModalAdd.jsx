/* eslint-disable react/prop-types */
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import { saveTodo } from "../services/storage";

const ModalAdd = ({ addTodo, onHide, ...props }) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [deadline, setDeadline] = useState(new Date());

	const handleSave = (event) => {
		event.preventDefault();

		onHide();

		const newTodo = {
			id: uuidv4(),
			title: title,
			description: description,
			deadline: deadline,
			completed: false,
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
		};

		saveTodo(newTodo);

		addTodo(newTodo);

		setTitle("");
		setDescription("");
		setDeadline("");
	};

	const handleExit = () => {
		onHide();

		setTitle("");
		setDescription("");
		setDeadline("");
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
					Add To do
				</Modal.Title>
			</Modal.Header>
			<Form onSubmit={handleSave} className="paragraph-body-font">
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
					<Modal.Footer>
						<Button
							bsPrefix="button-cancel modal-button"
							variant="danger"
							onClick={() => handleExit()}
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

export default ModalAdd;
