import Link from 'next/link'
import {getServerSession} from "next-auth"
import { authOptions } from './api/auth/[...nextauth]/route'
import User from '@/components/User'
export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
    <div className='flex items-center text-center justify-center min-h-screen gap-3'>
      <Link href="/login" className='text-white bg-[#404040] px-3 py-1 rounded-md'>
        <button>Login</button>
      </Link>
      <Link href="/register" className='text-white bg-blue-400 px-3 py-1 rounded-md'>
        <button>Register</button>
      </Link>
      <h1>Server side</h1>
      <pre>{JSON.stringify(session)}</pre>
      <h1>Client Side</h1>
      <User />
      
    </div>
  )
}
