import { signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../firebase"

const Login = () => {
	const [error, setError] = useState(false)
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()
		const email = e.target[0].value
		const password = e.target[1].value

		try {
			await signInWithEmailAndPassword(auth, email, password)
			navigate("/")
		} catch (error) {
			setError(true)
		}
	}
	return (
		<section className="bg-blue-500 h-screen grid place-content-center">
			<div className="bg-slate-100 px-10 py-5 rounded-md space-y-5">
				<p className="text-3xl font-medium text-center">Login</p>

				<form onSubmit={handleSubmit} className="grid gap-y-5">
					<input
						className="w-64 p-3 rounded-md"
						type="email"
						placeholder="email"
					/>

					<input
						className="w-64 p-3 rounded-md"
						type="password"
						placeholder="password"
					/>

					<button className="p-2 bg-blue-500 text-white font-medium text-lg rounded-md transition duration-300 hover:bg-blue-600">
						Sign in
					</button>

					{error && <p className="text-red-500">Something went wrong</p>}
				</form>

				<p className="space-x-1">
					<span>You don't have an account?</span>
					<Link to="/register" className="text-blue-500 hover:underline">
						Register
					</Link>
				</p>
			</div>
		</section>
	)
}

export default Login
