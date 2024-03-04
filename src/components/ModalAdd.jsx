/* eslint-disable react/prop-types */
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import { saveTodo } from "../services/storage";

const ModalAdd = (props) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [deadline, setDeadline] = useState(new Date());

	const handleSave = () => {
		const newTodo = {
			id: uuidv4(),
			title: title,
			description: description,
			deadline: deadline,
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
		};

		saveTodo(newTodo);

		props.addTodo(newTodo);

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
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Add Todo
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
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
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="danger" onClick={props.onHide}>
					Close
				</Button>
				<Button
					variant="success"
					onClick={() => {
						handleSave();
						props.onHide();
					}}
				>
					Save
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ModalAdd;
