"use client"
import React,{useEffect, useState} from 'react';
import { signOut,useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';


export default function DashboardPage(){
  
    const router = useRouter();
    const [newName, setNewName] = useState('');
    const {data: session, status,update} = useSession();
    console.log("use session hook session object",session)
    console.log(status)
    useEffect(() => {
      if(session === undefined || session === null) {
        router.push('/login')
      }
    },[session, router]);
    

    return(
      <div className='flex items-center min-h-screen flex-col'>
        <h1>Dashboard</h1>
        <p className=''>Hii ! <span className='capitalize font-semibold '>{session?.user?.name} </span></p>
        <button className='bg-red-500 text-md text-white p-3 rounded-full ' onClick={() => {signOut()}}>Sign out</button>
      </div>
    )
}






