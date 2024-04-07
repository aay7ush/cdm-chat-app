import { useContext } from "react"
import { ChatContext } from "../context/ChatContext"
import Input from "./Input"
import Messages from "./Messages"

const Chat = () => {
	const { data } = useContext(ChatContext)

	return (
		<div>
			<div className="flex justify-between p-4 bg-zinc-800 text-white">
				<p className="text-xl">{data.user?.displayName}</p>

				<div className="flex items-center gap-x-2">
					<img src="/cam.png" alt="cam icon" className="w-7" />
					<img src="/add.png" alt="add icon" className="w-7" />
					<img src="/more.png" alt="more icon" className="w-7" />
				</div>
			</div>

			<Messages />

			<Input />
		</div>
	)
}

export default Chat
