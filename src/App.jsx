import { useState } from "react";
import "./App.css";

function App() {
	const [boards, setBoards] = useState([
		{
			id: 1,
			title: "To do",
			tasks: [
				{ id: 1, text: "watch movie" },
				{ id: 2, text: "boxing" },
				{ id: 3, text: "sleep" },
				{ id: 4, text: "eat" },
				{ id: 5, text: "do homework" },
			],
		},
		{
			id: 2,
			title: "In progress",
			tasks: [
				{ id: 6, text: "family" },
				{ id: 7, text: "code" },
				{ id: 8, text: "read books" },
			],
		},
		{
			id: 3,
			title: "Done",
			tasks: [
				{ id: 9, text: "uiniversity" },
				{ id: 10, text: "workout" },
				{ id: 11, text: "games" },
				{ id: 12, text: "dance" },
			],
		},
	]);
	const [currentBoard, setCurrentBoard] = useState(null);
	const [currentTask, setCurrentTask] = useState(null);

	const dragStart = (e, board, task) => {
		setCurrentBoard(board);
		setCurrentTask(task);
	};

	const dragOver = (e) => {
		e.preventDefault();
		e.target.style.boxShadow = "0 5px 5px black";
	};

	const dragLeave = (e) => {
		e.target.style.boxShadow = "none";
	};

	const drop = (e, board, task) => {
		e.preventDefault();
		e.stopPropagation();
		const currentIndex = currentBoard.tasks.indexOf(currentTask);
		currentBoard.tasks.splice(currentIndex, 1);
		const dropIndex = board.tasks.indexOf(task) + 1;
		board.tasks.splice(dropIndex, 0, currentTask);

		setBoards(
			boards.map((b) => {
				if (b.id === board.id) {
					return board;
				}

				if (b.id === currentBoard.id) {
					return currentBoard;
				}

				return b;
			})
		);

		e.target.style.boxShadow = "none";
	};

	const dragOverBoard = (e) => {
		e.preventDefault();
	};

	const dropOnBoard = (e, board) => {
		e.preventDefault();
		const currentIndex = currentBoard.tasks.indexOf(currentTask);
		currentBoard.tasks.splice(currentIndex, 1);
		board.tasks.push(currentTask);

		setBoards(
			boards.map((b) => {
				if (b.id === board.id) {
					return board;
				}

				if (b.id === currentBoard.id) {
					return currentBoard;
				}

				return b;
			})
		);
	};

	return (
		<div className="app">
			<div className="boards">
				{boards.map((board) => (
					<div
						className="board"
						key={board.id}
						onDragOver={(e) => dragOverBoard(e)}
						onDrop={(e) => dropOnBoard(e, board)}
					>
						<div className="title">{board.title}</div>
						<div className="tasks">
							{board.tasks.map((task) => (
								<div
									className="task"
									key={task.id}
									draggable
									onDragStart={(e) => dragStart(e, board, task)}
									onDragOver={dragOver}
									onDragLeave={dragLeave}
									onDrop={(e) => drop(e, board, task)}
								>
									{task.text}
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default App;
