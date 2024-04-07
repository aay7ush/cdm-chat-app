import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { auth, db, storage } from "../firebase"

const Register = () => {
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		setLoading(true)
		e.preventDefault()
		const displayName = e.target[0].value
		const email = e.target[1].value
		const password = e.target[2].value
		const file = e.target[3].files[0]

		try {
			const res = await createUserWithEmailAndPassword(auth, email, password)

			const date = new Date().getTime()
			const storageRef = ref(storage, `${displayName + date}`)

			await uploadBytesResumable(storageRef, file).then(() => {
				getDownloadURL(storageRef).then(async (downloadURL) => {
					try {
						await updateProfile(res.user, {
							displayName,
							photoURL: downloadURL,
						})
						await setDoc(doc(db, "users", res.user.uid), {
							uid: res.user.uid,
							displayName,
							email,
							photoURL: downloadURL,
						})

						await setDoc(doc(db, "userChats", res.user.uid), {})
						navigate("/")
					} catch (error) {
						console.log(error)
						setError(true)
						setLoading(false)
					}
				})
			})
		} catch (error) {
			setError(true)
			setLoading(false)
		}
	}

	return (
		<section className="bg-blue-500 h-screen grid place-content-center">
			<div className="bg-slate-100 px-10 py-5 rounded-md space-y-5">
				<h3 className="text-3xl font-medium text-center">Register</h3>

				<form onSubmit={handleSubmit} className="grid gap-y-5">
					<input
						className="w-64 p-3 rounded-md"
						required
						type="text"
						placeholder="name"
					/>

					<input
						className="w-64 p-3 rounded-md"
						required
						type="email"
						placeholder="email"
					/>

					<input
						className="w-64 p-3 rounded-md"
						required
						type="password"
						placeholder="password"
					/>

					<input required style={{ display: "none" }} type="file" id="file" />

					<label
						htmlFor="file"
						className="flex items-center gap-x-2 text-blue-500 cursor-pointer"
					>
						<img src="/addAvatar.png" alt="icon" className="w-12" />
						<span>Add an avatar</span>
					</label>

					<button
						disabled={loading}
						className="p-2 bg-blue-500 text-white font-medium text-lg rounded-md transition duration-300 hover:bg-blue-600"
					>
						Sign up
					</button>

					{loading && <p>Uploading and compressing the image please wait...</p>}

					{error && <p className="text-red-500">Something went wrong</p>}
				</form>

				<p className="text-center space-x-1">
					<span>You have an account?</span>
					<Link to="/login" className="text-blue-500 hover:underline">
						Login
					</Link>
				</p>
			</div>
		</section>
	)
}

export default Register
