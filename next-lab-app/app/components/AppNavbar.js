"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { useAuth } from "@/app/lib/AuthContext";
import { auth } from "@/app/lib/firebase";
import UserProfile from "./UserProfile";

export default function Navbar() {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div>
        <h1 className="text-xl font-bold">Next.js Laboratory Project</h1>
      </div>
      <nav className="flex items-center space-x-4">
        {user ? (
          <>
            <UserProfile />

            <Link href="/protected/user/signout">
              <button className="bg-red-500 px-4 py-2 rounded">Log Out</button>
            </Link>
          </>
        ) : (
          <div className="space-x-4">
            <Link
              href="/public/user/signin"
              className="bg-blue-500 px-4 py-2 rounded"
            >
              Log In
            </Link>
            <Link
              href="/public/user/register"
              className="bg-green-500 px-4 py-2 rounded"
            >
              Sign Up
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
