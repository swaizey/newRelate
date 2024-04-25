import React from 'react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../api/auth/[...nextauth]/route'
import Login from './Login'

const page = async() => {
    const session = await getServerSession(authOptions)
    if(session) redirect('/')
  return <Login />
}

export default page