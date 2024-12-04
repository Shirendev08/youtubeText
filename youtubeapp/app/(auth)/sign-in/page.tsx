"use client"
import React from 'react'
import MyForm from '@/components/MyForm'
import { ModeToggle } from '@/components/ModeToggle';
const page = () => {
  
  return (
    <section className="flex-center size-full max-sm:px-6">
      <ModeToggle/>
    <MyForm />
    </section>
  )
}

export default page