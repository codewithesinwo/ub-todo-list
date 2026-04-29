import { FaSun } from "react-icons/fa";
import { FiCircle } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { CiEdit } from "react-icons/ci";
import { FaRegMoon } from "react-icons/fa6";
import { useEffect, useState } from "react";

export default function UbTodoApp() {
	const [isToggle, setIsToggle] = useState(false);

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

	return (
		<div className="min-h-screen  dark:bg-amber-50 bg-gray-900 flex flex-col items-center justify-start">
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
							placeholder="type"
							className="bg-transparent outline-none text-white w-full dark:text-black"
						/>
					</div>
				</div>
			</div>

			<div className="w-full max-w-xl px-4 -mt-16">
				<div className="bg-gray-900 rounded-md shadow-xl overflow-hidden dark:bg-amber-50">
					<div className="flex items-center justify-between p-4 border-b border-gray-700 dark:border-gray-600">
						<div className="flex items-center gap-4">
							<FiCircle className="text-gray-400 text-xl" />
							<p className="text-white dark:text-black">
								Go to Florintech and get me a Laptop
							</p>
						</div>
						<div className="flex gap-5">
							<CiEdit className="text-gray-400 cursor-pointer" />
							<RxCross2 className="text-gray-400 cursor-pointer" />
						</div>
					</div>

					<div className="flex justify-between items-center p-4 text-gray-400 text-sm border-t border-gray-700 dark:border-gray-500 text-black">
						<span>0 items left</span>

						<div className="flex gap-4">
							<button className="text-blue-500 cursor-pointer">All</button>
							<button className="hover:text-white cursor-pointer dark:hover:text-black">
								Active
							</button>
							<button className="hover:text-white cursor-pointer dark:hover:text-black">
								Completed
							</button>
						</div>

						<button className="hover:text-white cursor-pointer dark:hover:text-black">
							Clear Completed
						</button>
					</div>
				</div>

				<p className="text-center text-gray-500 mt-6 text-sm">
					Drag and drop to reorder list
				</p>
			</div>
		</div>
	);
}
