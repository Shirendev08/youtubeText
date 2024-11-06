"use client"
import React from 'react'
import MyForm from '@/components/MyForm'
import { login } from '@/lib/auth';
import { ModeToggle } from '@/components/ModeToggle';
const page = () => {
  const handleLogin = async (username: string, password: string) => {
    try {
        await login(username, password);
        alert('Login successful');
    } catch (error) {
        console.error(error);
        alert('Login failed');
    }
};
  return (
    <section className="flex-center size-full max-sm:px-6">
      <ModeToggle/>
    <MyForm onSubmit={handleLogin} />
    </section>
  )
}

export default page