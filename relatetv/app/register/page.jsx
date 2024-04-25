import React from 'react'
import GenderSelect from './genderSelect'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../api/auth/[...nextauth]/route'


const page = async() => {
    const session = await getServerSession(authOptions)
    if(session) redirect('/')
  return <GenderSelect />
}

export default page