export const getAllTodos = () => {
	// Get the notes from localStorage and parse them into an array
	const notes = JSON.parse(localStorage.getItem("notes")) || [];

	return notes;
};

export const saveTodo = (note) => {
	// Get the existing notes
	const existingNotes = JSON.parse(localStorage.getItem("notes")) || [];

	// Add the new note to the existing notes
	existingNotes.push(note);

	// Save the updated notes back to localStorage
	localStorage.setItem("notes", JSON.stringify(existingNotes));
};

export const deleteTodo = (id) => {
	// Get the existing notes
	const existingNotes = JSON.parse(localStorage.getItem("notes")) || [];

	// Remove the note with the given id
	const updatedNotes = existingNotes.filter((note) => note.id !== id);

	// Save the updated notes back to localStorage
	localStorage.setItem("notes", JSON.stringify(updatedNotes));
};
