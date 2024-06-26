import { doc, onSnapshot } from "firebase/firestore"
import { useContext, useEffect, useState } from "react"
import { ChatContext } from "../context/ChatContext"
import { db } from "../firebase"
import Message from "./Message"

const Messages = () => {
	const [messages, setMessages] = useState([])
	const { data } = useContext(ChatContext)

	useEffect(() => {
		const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
			doc.exists() && setMessages(doc.data().messages)
		})

		return () => {
			unSub()
		}
	}, [data.chatId])

	console.log(messages)

	return (
		<div className="bg-slate-100 p-4 h-80 overflow-y-scroll space-y-2">
			{messages.map((m) => (
				<Message message={m} key={m.id} />
			))}
		</div>
	)
}

export default Messages
