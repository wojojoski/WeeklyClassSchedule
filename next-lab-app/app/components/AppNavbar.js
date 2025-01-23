"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { useAuth } from "@/app/lib/AuthContext";
import { auth } from "@/app/lib/firebase";
import UserProfile from "./UserProfile";
import { useState } from "react";

export default function Navbar() {
  const { user } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <header className="bg-gray-800 text-white w-full">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center py-4">
          <div className="flex items-center justify-between w-full md:w-auto">
            <h1 className="text-xl font-bold">Next.js Laboratory Project</h1>
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              ☰
            </button>
          </div>

          <nav
            className={`${
              isMenuOpen ? "block" : "hidden"
            } md:block w-full md:w-auto mt-4 md:mt-0`}
          >
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
              {user ? (
                <>
                  <UserProfile />
                  <Link href="/protected/user/signout">
                    <button className="bg-red-500 px-4 py-2 rounded w-full md:w-auto">
                      Log Out
                    </button>
                  </Link>
                </>
              ) : (
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto">
                  <Link
                    href="/public/user/signin"
                    className="bg-blue-500 px-4 py-2 rounded text-center"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/public/user/register"
                    className="bg-green-500 px-4 py-2 rounded text-center"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
