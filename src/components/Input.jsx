import {
	Timestamp,
	arrayUnion,
	doc,
	serverTimestamp,
	updateDoc,
} from "firebase/firestore"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import React, { useContext, useState } from "react"
import { v4 as uuid } from "uuid"
import { AuthContext } from "../context/AuthContext"
import { ChatContext } from "../context/ChatContext"
import { db, storage } from "../firebase"

const Input = () => {
	const [text, setText] = useState("")
	const [img, setImg] = useState(null)

	const { currentUser } = useContext(AuthContext)
	const { data } = useContext(ChatContext)

	const handleSend = async (e) => {
		e.preventDefault()

		if (img) {
			const storageRef = ref(storage, uuid())

			const uploadTask = uploadBytesResumable(storageRef, img)

			uploadTask.on(
				(error) => {},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
						await updateDoc(doc(db, "chats", data.chatId), {
							messages: arrayUnion({
								id: uuid(),
								text,
								senderId: currentUser.uid,
								date: Timestamp.now(),
								img: downloadURL,
							}),
						})
					})
				}
			)
		} else {
			await updateDoc(doc(db, "chats", data.chatId), {
				messages: arrayUnion({
					id: uuid(),
					text,
					senderId: currentUser.uid,
					date: Timestamp.now(),
				}),
			})
		}

		await updateDoc(doc(db, "userChats", currentUser.uid), {
			[data.chatId + ".lastMessage"]: {
				text,
			},
			[data.chatId + ".date"]: serverTimestamp(),
		})

		await updateDoc(doc(db, "userChats", data.user.uid), {
			[data.chatId + ".lastMessage"]: {
				text,
			},
			[data.chatId + ".date"]: serverTimestamp(),
		})

		setText("")
		setImg(null)
	}

	return (
		<form className="bg-white flex" onSubmit={handleSend}>
			<input
				className="w-full indent-4 outline-none"
				type="text"
				placeholder="Type something..."
				onChange={(e) => setText(e.target.value)}
				value={text}
			/>

			<div className="flex items-center gap-x-4">
				<input
					type="file"
					style={{ display: "none" }}
					id="file"
					onChange={(e) => setImg(e.target.files[0])}
				/>

				<label htmlFor="file">
					<img
						src="/img.png"
						alt="img icon"
						className="h-7 w-12 cursor-pointer"
					/>
				</label>

				<button className="text-white bg-zinc-800 py-3 px-4 transition duration-300 hover:bg-zinc-900">
					Send
				</button>
			</div>
		</form>
	)
}

export default Input
