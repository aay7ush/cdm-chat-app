import { useContext, useEffect, useRef } from "react"
import { AuthContext } from "../context/AuthContext"
import { ChatContext } from "../context/ChatContext"

const Message = ({ message }) => {
	const { currentUser } = useContext(AuthContext)
	const { data } = useContext(ChatContext)

	const ref = useRef()

	useEffect(() => {
		ref.current?.scrollIntoView({ behavior: "smooth" })
	}, [message])

	return (
		<div
			ref={ref}
			className={`flex items-center ${
				message.senderId === currentUser.uid && "flex-row-reverse"
			}`}
		>
			<div className="grid justify-items-center">
				<img
					src={
						message.senderId === currentUser.uid
							? currentUser.photoURL
							: data.user.photoURL
					}
					alt=""
					className="w-9"
				/>
				<span>just now</span>
			</div>
			<div
				className={`text-white px-3 py-2 ${
					message.senderId === currentUser.uid &&
					"bg-blue-500 mr-3 rounded-l-lg rounded-br-lg"
				} ${
					message.senderId !== currentUser.uid &&
					"bg-green-500 ml-3 rounded-r-lg rounded-bl-lg"
				}`}
			>
				<p>{message.text}</p>
				{message.img && <img src={message.img} alt="" />}
			</div>
		</div>
	)
}

export default Message
