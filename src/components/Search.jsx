import {
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	serverTimestamp,
	setDoc,
	updateDoc,
	where,
} from "firebase/firestore"
import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { db } from "../firebase"

const Search = () => {
	const [username, setUsername] = useState("")
	const [user, setUser] = useState(null)
	const [error, setError] = useState(false)

	const { currentUser } = useContext(AuthContext)

	const handleSearch = async (e) => {
		e.preventDefault()

		const q = query(
			collection(db, "users"),
			where("displayName", "==", username)
		)

		try {
			const querySnapshot = await getDocs(q)
			querySnapshot.forEach((doc) => {
				setUser(doc.data())
			})
		} catch (error) {
			setError(true)
		}
	}

	const handleSelect = async () => {
		const combinedId =
			currentUser.uid > user.uid
				? currentUser.uid + user.uid
				: user.uid + currentUser.uid
		try {
			const res = await getDoc(doc(db, "chats", combinedId))

			if (!res.exists()) {
				await setDoc(doc(db, "chats", combinedId), { messages: [] })

				await updateDoc(doc(db, "userChats", currentUser.uid), {
					[combinedId + ".userInfo"]: {
						uid: user.uid,
						displayName: user.displayName,
						photoURL: user.photoURL,
					},
					[combinedId + ".date"]: serverTimestamp(),
				})

				await updateDoc(doc(db, "userChats", user.uid), {
					[combinedId + ".userInfo"]: {
						uid: currentUser.uid,
						displayName: currentUser.displayName,
						photoURL: currentUser.photoURL,
					},
					[combinedId + ".date"]: serverTimestamp(),
				})
			}
		} catch (error) {}

		setUser(null)
		setUsername("")
	}

	return (
		<form onSubmit={handleSearch} className="space-y-3">
			<input
				type="text"
				placeholder="Find a user"
				onChange={(e) => setUsername(e.target.value)}
				value={username}
				className="p-2 rounded-md outline-none"
			/>

			{error && <p className="text-red-500">User not found!</p>}

			{user && (
				<div
					onClick={handleSelect}
					className="text-white flex items-center gap-x-2 cursor-pointer"
				>
					<img src={user.photoURL} alt="profile photo" className="w-10" />
					<p>{user.displayName}</p>
				</div>
			)}
		</form>
	)
}

export default Search
