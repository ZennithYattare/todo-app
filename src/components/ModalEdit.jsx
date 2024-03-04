/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import { editTodo } from "../services/storage";

const ModalEdit = (props) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [deadline, setDeadline] = useState(new Date());

	useEffect(() => {
		if (props.todo) {
			setTitle(props.todo.title);
			setDescription(props.todo.description);
			setDeadline(props.todo.deadline);
		}
	}, [props.todo]);

	const handleEdit = () => {
		const updatedTodo = {
			id: props.todo.id,
			title: title,
			description: description,
			deadline: deadline,
			created_at: props.todo.created_at,
			updated_at: new Date().toISOString(),
		};

		editTodo(updatedTodo);

		props.updateTodo(updatedTodo);

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
						handleEdit();
						props.onHide();
					}}
				>
					Save
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ModalEdit;
