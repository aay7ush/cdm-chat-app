import { signOut } from "firebase/auth"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { auth } from "../firebase"
import Chats from "./Chats"
import Search from "./Search"

const Sidebar = () => {
	const { currentUser } = useContext(AuthContext)

	return (
		<aside className="bg-zinc-800 p-4 space-y-3">
			<header className="flex justify-between text-white">
				<div className="flex gap-x-2 items-center">
					<img
						src={currentUser.photoURL}
						alt="profile photo"
						className="w-10"
					/>
					<p>{currentUser.displayName}</p>
				</div>

				<button
					onClick={() => signOut(auth)}
					className="bg-red-500 px-3 rounded-md transition duration-300 hover:bg-red-600"
				>
					logout
				</button>
			</header>

			<Search />

			<Chats />
		</aside>
	)
}

export default Sidebar
