"use client"
import { useRouter } from "next/navigation";
import { logout } from "@/lib/auth";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { CardDemo } from "@/components/Card";
import { Create } from "@/components/Create";
export default function Home() {
  const router = useRouter();

  const handleLogout = () => {
    logout(); // Call the logout function
    router.push("/sign-in"); // Redirect to the sign-in page after logging out
  };
  return (
   
   <div>
      <ModeToggle/>
     <Button onClick={handleLogout} className="mt-1">Logout</Button>
    <div className="flex flex-col">
      <Create/>

    </div>

     <div className="overflow-x-auto ">
        <CardDemo/>
     </div>
   </div>
  );
}
