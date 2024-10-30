"use client"
import MyForm from "@/components/MyForm";
import { login } from '../lib/auth';
export default function Home() {
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
   
   <div>
     <MyForm onSubmit={handleLogin} />;
   </div>
  );
}
