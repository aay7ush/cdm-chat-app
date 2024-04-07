import { doc, onSnapshot } from "firebase/firestore"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { ChatContext } from "../context/ChatContext"
import { db } from "../firebase"

const Chats = () => {
	const [chats, setChats] = useState([])

	const { currentUser } = useContext(AuthContext)
	const { dispatch } = useContext(ChatContext)

	useEffect(() => {
		const getChats = () => {
			const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
				setChats(doc.data())
			})

			return () => {
				unsub()
			}
		}

		currentUser.uid && getChats()
	}, [currentUser.uid])

	const handleSelect = (u) => {
		dispatch({ type: "CHANGE_USER", payload: u })
	}

	return (
		<>
			{chats &&
				Object.entries(chats)
					?.sort((a, b) => b[1].date - a[1].date)
					.map((chat) => (
						<div
							className="text-white flex gap-x-2 items-center cursor-pointer"
							key={chat[0]}
							onClick={() => handleSelect(chat[1].userInfo)}
						>
							<img
								src={chat[1].userInfo.photoURL}
								alt="profile photo"
								className="w-10"
							/>
							<p>{chat[1].userInfo.displayName}</p>
							{/* <p className="text-sm">{chat[1].lastMessage?.text}</p> */}
						</div>
					))}
		</>
	)
}

export default Chats
