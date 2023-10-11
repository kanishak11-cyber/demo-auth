"use client"

import Link from "next/link";
import {useState, useEffect} from 'react'
import axios from "axios";
import toast, { Toast } from "react-hot-toast";
import {signIn, useSession} from 'next-auth/react'
import {useRouter} from 'next/navigation';


const LoginForm = () => {
  const router = useRouter()
  const session = useSession();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  };

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log(formData)
    
    signIn("credentials",{
      ...formData,
      redirect:false,
    }).then((callback)=>{
      if(callback?.error){
        toast.error(callback.error)
      }else{
        if(callback?.ok && !callback?.error){
          toast.success("Logged In successfull")
        }
      }
    })
  }
  
useEffect(()=>{
  if(session?.status === 'authenticated'){
    router.push('/dashboard')
  }
})
  // Fetch the session and its status


console.log(session)

    return (
        <>
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
              </h2>
            </div>
    
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              {status === "loadind" ? (
                <p>Loading...</p>
              ) : (
              <form className="space-y-6" onSubmit={handleLogin} method="POST">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
    
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
    
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in
                  </button>
                </div>
              </form>
     )}
              <p className="mt-10 text-center text-sm text-gray-500">
                Not a member?{" "}
                <Link
                  href="/register"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  Register Now
                </Link>
              </p>
            </div>
          </div>
        </>
      );

}

export default LoginForm