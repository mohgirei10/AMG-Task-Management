import { useEffect, useState } from "react"
import { baseUrl } from "../utility/constant"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"


const SignUp = () => {
  const navigate = useNavigate() 
  const [firstName, setFirstName] = useState("")
  const [lastName, setlastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confrimPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [message, setMessage] = useState(false)

    useEffect(() => {
      if (localStorage.getItem("token")) {
        navigate("/")
      }
    })


  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault()
    setError("");
    setMessage(false);
    setLoading(true)
    if (!firstName || !lastName || !email || !password || !confrimPassword) {
      setError("All fields are required.")
      setLoading(false)
      return
    }
    if (password!==confrimPassword) {
      setError("Passwords do not match")
      setLoading(false)  
      return
    }
    if (password.length < 8 ) {
      setError("Password must be greater than 8 characters")
      setLoading(false)  
      return
    }
    try {
      await axios.post(`${baseUrl}/auth/signup`, {
        firstName,
        lastName,
        email,
        password
      })
      setMessage(true)

    } catch (error: any) {
      // if (axios.isaxio(error)) {
      //   setError(error.response?.data?.message)
      // }
      console.error(error);
         
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 min-h-screen">
      <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Create an account
          </p>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="firstName">
              First Name
            </label>
            <input
              placeholder="John"
              value={firstName}
              onChange={(e)=>setFirstName(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
              id="firstName"
              type="text"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="lastName">
              Last Name
            </label>
            <input
              placeholder="Doe"
              value={lastName}
              onChange={(e)=>setlastName(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
              id="lastName"
              type="text"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="email">
              Email
            </label>
            <input
              placeholder="you@example.com"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
              id="email"
              type="email"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
              placeholder="••••••••"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              id="password"
              type="password"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Confirm password
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
              placeholder="••••••••"
              value={confrimPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
              id="confirmPassword"
              type="password"
            />
          </div>
         {error && <p className="text-red-600">{error}</p>}
          <button
            className="w-full disabled:bg-gray-400 disabled:cursor-not-allowed bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  focus:ring-blue-800 text-white"
            type="submit"
            disabled={loading}
            >
            Create an account
          </button>
            {message && <p className="text-green-500">User created successfully. Click <Link to = {'/login'} >here</Link> to login</p>}
            <p className="text-blue-500 text-center">Already have an account? <Link to = {'/login'} className=" underline" >Login</Link></p>
        </div>
      </div>
    </div>
  </form>

  )
}

export default SignUp