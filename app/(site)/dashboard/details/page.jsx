"use client"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const page = () => {
    const router = useRouter();
    const [newName, setNewName] = useState('');
    const {data: session, status,update} = useSession();
    console.log("use session hook session object",session)
    console.log(status)
    // useEffect(() => {
    //   if(session === undefined || session === null) {
    //     router.push('/login')
    //   }
    // },[session, router]);
    
  return (
    <div>{session?.user.name}</div>
  )
}

export default page