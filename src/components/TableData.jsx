import Table from "react-bootstrap/Table";

const TableData = () => {
	return (
		<div className="div-table">
			<Table bordered hover>
				<thead>
					<tr>
						<th>Status</th>
						<th>Task</th>
						<th>Due Date</th>
						<th>Priority</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>1</td>
						<td>Task 1</td>
						<td>2021-10-01</td>
						<td>High</td>
						<td>
							<button>Edit</button>
							<button>Delete</button>
						</td>
					</tr>
					<tr>
						<td>2</td>
						<td>Task 2</td>
						<td>2021-10-02</td>
						<td>Medium</td>
						<td>
							<button>Edit</button>
							<button>Delete</button>
						</td>
					</tr>
					<tr>
						<td>3</td>
						<td>Task 3</td>
						<td>2021-10-03</td>
						<td>Low</td>
						<td>
							<button>Edit</button>
							<button>Delete</button>
						</td>
					</tr>
				</tbody>
			</Table>
		</div>
	);
};

export default TableData;
