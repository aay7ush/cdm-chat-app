import Chat from "../components/Chat"
import Sidebar from "../components/Sidebar"

const Home = () => {
	return (
		<section className="h-screen bg-blue-500 grid place-content-center">
			<div className="grid grid-cols-[1fr_3fr] rounded-lg overflow-hidden">
				<Sidebar />
				<Chat />
			</div>
		</section>
	)
}

export default Home
