import { useEffect, useState } from "react"
import axios from "axios"
import { baseUrl } from "../utility/constant"
import { Link, useNavigate } from "react-router-dom"


const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/")
    }
  })

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault()
    setError("");
    setLoading(true)
    if (!email || !password) {
      setError("All fields are required.")
      setLoading(false)
      return
    }
    try {
      const response = await axios.post(`${baseUrl}/auth/login`, {
        email,
        password
      })
      localStorage.setItem("token", response.data.token)
      navigate("/")
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message)
      }   
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
            Log Into Your Account
          </p>
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
            <div className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg flex gap-2 w-full p-2.5">

            <input
              className=" outline-none w-full"
              placeholder="••••••••"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              id="password"
              type={showPassword ? "text" : "password"}
              />
              <p
              className=" text-end cursor-pointer text-xs "
              onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </p>
              </div>
          </div>
         {error && <p className="text-red-600">{error}</p>}
          <button
            className="w-full disabled:bg-gray-400 disabled:cursor-not-allowed bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  focus:ring-blue-800 text-white"
            type="submit"
            disabled={loading}
            >
            Log In
          </button>
            <p className="text-blue-500 text-center">Don't have an account? <Link to = {'/signup'} className=" underline" >Sign up</Link></p>
        </div>
      </div>
    </div>
  </form>

  )
}

export default Login