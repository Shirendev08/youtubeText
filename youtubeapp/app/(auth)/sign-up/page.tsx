"use client"
import React from 'react'
import MyForm1 from '@/components/MyForm1'
import { ModeToggle } from '@/components/ModeToggle';
const page = () => {
  
  return (
    <section className="flex-center size-full max-sm:px-6">
      <ModeToggle/>
    <MyForm1/>
    </section>
  )
}

export default page