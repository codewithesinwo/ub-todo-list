import { FaSun } from "react-icons/fa";
import { FiCircle } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { CiEdit } from "react-icons/ci";
import { FaRegMoon } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function UbTodoApp() {
	const [isToggle, setIsToggle] = useState(false);
	const [todos, setTodos] = useState([]);
	const [inputValue, setInputValue] = useState("");
	const [filter, setFilter] = useState("all");
	const [editingId, setEditingId] = useState(null);
	const [editValue, setEditValue] = useState("");
	const [draggedTodo, setDraggedTodo] = useState(null);

	useEffect(() => {
		const savedTodos = localStorage.getItem("todos");
		const savedDarkMode = localStorage.getItem("darkMode");
		if (savedTodos) {
			setTodos(JSON.parse(savedTodos));
		}
		if (savedDarkMode) {
			setIsToggle(JSON.parse(savedDarkMode));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	useEffect(() => {
		localStorage.setItem("darkMode", JSON.stringify(isToggle));
	}, [isToggle]);

	const toggleDarkMood = () => {
		setIsToggle((prev) => !prev);
	};

	useEffect(() => {
		if (isToggle) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [isToggle]);

	const addTodo = (e) => {
		if (e.key === "Enter" && inputValue.trim()) {
			const newTodo = {
				id: Date.now(),
				text: inputValue,
				completed: false,
			};
			setTodos([newTodo, ...todos]);
			setInputValue("");
		}
	};

	const deleteTodo = (id) => {
		setTodos(todos.filter((todo) => todo.id !== id));
	};

	const toggleTodo = (id) => {
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo,
			),
		);
	};

	const startEdit = (todo) => {
		setEditingId(todo.id);
		setEditValue(todo.text);
	};

	const saveEdit = (id) => {
		if (editValue.trim()) {
			setTodos(
				todos.map((todo) =>
					todo.id === id ? { ...todo, text: editValue } : todo,
				),
			);
		}
		setEditingId(null);
		setEditValue("");
	};

	const cancelEdit = () => {
		setEditingId(null);
		setEditValue("");
	};

	const clearCompleted = () => {
		setTodos(todos.filter((todo) => !todo.completed));
	};

	const handleDragStart = (todo) => {
		setDraggedTodo(todo);
	};

	const handleDragOver = (e) => {
		e.preventDefault();
	};

	const handleDrop = (targetTodo) => {
		if (draggedTodo && draggedTodo.id !== targetTodo.id) {
			const draggedIndex = todos.findIndex((t) => t.id === draggedTodo.id);
			const targetIndex = todos.findIndex((t) => t.id === targetTodo.id);

			const newTodos = [...todos];
			newTodos.splice(draggedIndex, 1);
			newTodos.splice(targetIndex, 0, draggedTodo);

			setTodos(newTodos);
		}
		setDraggedTodo(null);
	};

	const filteredTodos = todos.filter((todo) => {
		if (filter === "active") return !todo.completed;
		if (filter === "completed") return todo.completed;
		return true;
	});

	const itemsLeft = todos.filter((todo) => !todo.completed).length;

	return (
		<div className="min-h-screen dark:bg-amber-50 bg-gray-900 flex flex-col items-center justify-start">
			<div className="w-full h-[250px] bg-[url('./assets/bg-desktop-dark.jpg')] bg-cover bg-center flex items-center justify-center dark:bg-[url('./assets/bg-desktop-light.jpg')]">
				<div className="w-full max-w-xl px-4">
					<div className="flex justify-between items-center mb-6">
						<h1 className="text-white text-3xl font-bold">UB-TODO</h1>
						<div
							onClick={toggleDarkMood}
							className="text-white text-xl cursor-pointer">
							{isToggle ?
								<FaSun />
							:	<FaRegMoon />}
						</div>
					</div>

					<div className="flex items-center gap-4 bg-gray-900 p-4 rounded-md shadow-lg dark:bg-amber-50">
						<FiCircle className="text-gray-400 text-xl dark:text-black" />
						<input
							type="text"
							placeholder="Add a new todo..."
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							onKeyPress={addTodo}
							className="bg-transparent outline-none text-white w-full dark:text-black placeholder-gray-600 dark:placeholder-gray-400"
						/>
					</div>
				</div>
			</div>

			<div className="w-full max-w-xl px-4 -mt-16 pb-8">
				<div className="bg-gray-900 rounded-md shadow-xl overflow-hidden dark:bg-amber-50">
					{filteredTodos.length === 0 ?
						<div className="p-8 text-center text-gray-400 dark:text-gray-600">
							<p>No todos to display</p>
						</div>
					:	<>
							{filteredTodos.map((todo) => (
								<div
									key={todo.id}
									draggable
									onDragStart={() => handleDragStart(todo)}
									onDragOver={handleDragOver}
									onDrop={() => handleDrop(todo)}
									className="flex items-center justify-between p-4 border-b border-gray-700 dark:border-gray-300 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors cursor-move">
									{editingId === todo.id ?
										<div className="flex items-center gap-4 flex-1">
											<input
												type="text"
												value={editValue}
												onChange={(e) => setEditValue(e.target.value)}
												className="bg-gray-800 dark:bg-white text-white dark:text-black outline-none p-2 rounded flex-1"
												autoFocus
											/>
											<button
												onClick={() => saveEdit(todo.id)}
												className="text-green-500 hover:text-green-400 font-bold">
												Save
											</button>
											<button
												onClick={cancelEdit}
												className="text-red-500 hover:text-red-400 font-bold">
												Cancel
											</button>
										</div>
									:	<>
											<div className="flex items-center gap-4 flex-1">
												<div
													onClick={() => toggleTodo(todo.id)}
													className="cursor-pointer text-xl">
													{todo.completed ?
														<div className="flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full">
															<FaCheck className="text-white text-sm" />
														</div>
													:	<FiCircle className="text-gray-400 dark:text-gray-500" />
													}
												</div>
												<p
													className={`${
														todo.completed ?
															"line-through text-gray-400 dark:text-gray-500"
														:	"text-white dark:text-black"
													}`}>
													{todo.text}
												</p>
											</div>
											<div className="flex gap-5">
												<CiEdit
													onClick={() => startEdit(todo)}
													className="text-gray-400 dark:text-gray-600 cursor-pointer hover:text-blue-400 dark:hover:text-blue-500 transition"
												/>
												<RxCross2
													onClick={() => deleteTodo(todo.id)}
													className="text-gray-400 dark:text-gray-600 cursor-pointer hover:text-red-400 dark:hover:text-red-500 transition"
												/>
											</div>
										</>
									}
								</div>
							))}
						</>
					}

					<div className="flex flex-col sm:flex-row justify-between items-center p-4 text-gray-400 text-sm border-t border-gray-700 dark:border-gray-300 gap-4">
						<span className="dark:text-black">
							{itemsLeft} item{itemsLeft !== 1 ? "s" : ""} left
						</span>

						<div className="flex gap-4">
							<button
								onClick={() => setFilter("all")}
								className={`cursor-pointer transition ${
									filter === "all" ?
										"text-blue-500 font-bold"
									:	"hover:text-white dark:hover:text-black dark:text-black"
								}`}>
								All
							</button>
							<button
								onClick={() => setFilter("active")}
								className={`cursor-pointer transition ${
									filter === "active" ?
										"text-blue-500 font-bold"
									:	"hover:text-white dark:hover:text-black dark:text-black"
								}`}>
								Active
							</button>
							<button
								onClick={() => setFilter("completed")}
								className={`cursor-pointer transition ${
									filter === "completed" ?
										"text-blue-500 font-bold"
									:	"hover:text-white dark:hover:text-black dark:text-black"
								}`}>
								Completed
							</button>
						</div>

						<button
							onClick={clearCompleted}
							className="hover:text-white dark:hover:text-black dark:text-black cursor-pointer transition">
							Clear Completed
						</button>
					</div>
				</div>

				<p className="text-center text-gray-500 dark:text-gray-600 mt-6 text-sm">
					Drag and drop to reorder list
				</p>
			</div>
		</div>
	);
}
